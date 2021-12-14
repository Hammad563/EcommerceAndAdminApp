const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Cat = require('../models/cat')




exports.createProduct = (req,res) => {
     
    const {
        name , price, description, category, quantity, createdBy
    } = req.body;
    let productPicture = [];

    if(req.files.length >0 ){
        productPicture= req.files.map(file => {
            return {img: file.filename}
        });
    }
    
    const product = new Product({
            name: name,
            slug: slugify(name),
            price,
            description,
            productPicture,
            quantity,
            category,
            createdBy: req.user._id
    });

    product.save(((error,product) => {
        if (error){
            return res.status(400).json({error})
        }
        if (product){
            res.status(201).json({product})
        }
    }))
}


exports.getProducts = (req,res) => {
    const {slug} = req.params;

   Cat.findOne( {slug: slug}).select('_id type')
   .exec( (error, category) => {
        if(error){
            return res.status(400).json({error})
        }


        if(category) {
            Product.find({category: category._id}).exec( (error,products) => {

                if(error){
                    return res.status(400).json({error})
                }

                if(category.type){
                    if(products.length > 0) {
                        res.status(200).json({
                            products,
                            productsByPrice: {
                                greater600: products.filter(product => product.price >= 600),      
                            }
                        });
                    }
                }        
            })
        }
        
   });

}

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };
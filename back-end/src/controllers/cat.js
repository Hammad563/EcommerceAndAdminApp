
const Cat = require('../models/cat');
const slugify = require('slugify');
const shortid = require("shortid");


function createCat(categories, parentId = null){
    const categoryList = [];
    let category;

    if(parentId == null){
       category  =  categories.filter( (cat) => cat.parentId == undefined)
    }else{
        category = categories.filter( (cat) => cat.parentId == parentId)
    }

    for(let cate of category){
        categoryList.push( {
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCat(categories, cate._id)
        });
    }

    return categoryList;
};

// Add category

exports.addCat= (req,res) => {

    const catObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }

    if (req.file) {
        catObj.categoryImage = "/public/" + req.file.filename;
    }

    if(req.body.parentId){
        catObj.parentId = req.body.parentId;
    }

    const ca = new Cat(catObj);

    ca.save( (error,category) => {
        if(error){
            return res.status(400).json({error})
        }
        if(category){
            return res.status(201).json({category})
        }
        
    })

}


exports.getCat = (req,res) => {
    Cat.find({}).exec( (error,categories) => {
        if(error){
            return res.status(400).json({error})
        } 

        if(categories){
            const categoryList = createCat(categories);
             res.status(200).json({categoryList});
        }
    })
}

exports.updateCat = async (req,res) => {

    const {_id,name,parentId, type} = req.body;
    const  updatedCategories = [];
    // for multiple categories
    if(name instanceof Array) {
        for(let i = 0; i < name.length; i++){

            const category = {
                name: name[i],
                type: type[i]
            }

            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
           const updatedCategory = await Cat.findOneAndUpdate({_id: _id[i]}, category, {new: true});
           updatedCategories.push(updatedCategory);         
        }
    return res.status(201).json({ updatedCategories: updatedCategories});

        // for Single Category
    }else{
        const category = {
            name,
            type
        };
        if(parentId !== ""){
            category.parentId = parentId;        
        }
        const updatedCategory = await Cat.findOneAndUpdate({_id,}, category, {new: true});
        return res.status(201).json({updatedCategory})
    }
}

exports.deleteCategories = async (req, res) => {
    const {ids} = req.body.payload;
    const deletedCategories = [];

    for(let i =0; i < ids.length; i++){
        const deleteCategory = await Cat.findOneAndDelete(
             {_id: ids[i]._id}
            );
        deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length == ids.length){
        res.status(200).json({message: "categories removed"});
    }else{
        res.status(400).json({message: "something went wrong"})
    }

    
}
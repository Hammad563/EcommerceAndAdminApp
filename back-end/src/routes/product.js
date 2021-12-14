const express = require('express');
const router = express.Router();
const Cat = require('../models/cat');
const slugify = require('slugify');
const { addCat, getCat } = require('../controllers/cat');
const { requiresSignin, adminMiddle } = require('../middleware/middle');
const { createProduct, getProducts, getProductDetailsById } = require('../controllers/productCreate');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-'+ file.originalname)
    }
  })
  
  const upload = multer({storage});




router.post('/product/create',requiresSignin, adminMiddle, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProducts)
router.get('/product/:productId', getProductDetailsById);




//router.get('/category/get', getCat);

module.exports = router;
const express = require('express');
const router = express.Router();
const Cat = require('../models/cat');
const slugify = require('slugify');
const { addCat, getCat, updateCat, deleteCategories } = require('../controllers/cat');
const { requiresSignin, adminMiddle } = require('../middleware/middle');
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage });


router.post('/category/create',requiresSignin, adminMiddle, upload.single("categoryImage"), addCat);
router.get('/category/get', getCat);
router.post('/category/update',upload.array("categoryImage"), updateCat);
router.post('/category/delete', deleteCategories);

module.exports = router;
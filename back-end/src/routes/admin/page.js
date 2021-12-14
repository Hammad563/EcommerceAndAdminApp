const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { createPage, getPage } = require('../../controllers/admin/page');
const { upload } = require('../../middleware/middle');


router.post(`/page/create`, upload.fields([
  {
    name: 'banners'
  },
  {
    name: 'products'
  }
]),createPage)

router.get(`/page/:category/:type`, getPage);

module.exports = router;
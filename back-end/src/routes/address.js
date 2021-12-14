const express = require('express');
const { addAddress, getAddress } = require('../controllers/address');
const router = express.Router();
const { requiresSignin, userMiddle } = require('../middleware/middle');


router.post('/user/address/create',requiresSignin, userMiddle,addAddress);
router.post('/user/getaddress', requiresSignin, userMiddle, getAddress);

module.exports = router;
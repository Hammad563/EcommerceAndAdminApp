const express = require('express');
const { addCart, getCartItems } = require('../controllers/cart');

const router = express.Router();
const { requiresSignin, userMiddle } = require('../middleware/middle');


router.post('/user/cart/addtocart',requiresSignin, userMiddle, addCart);
router.post('/user/getCartItems',requiresSignin, userMiddle, getCartItems);

module.exports = router;
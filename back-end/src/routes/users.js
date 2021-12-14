const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {signup, signin, signout,} = require('../controllers/user');
const { validateRequest, validateSignIn } = require('../validators/vali');
const { isRequestValidated } = require('../validators/vali');



router.post('/signup',validateRequest, isRequestValidated, signup);
router.post('/signin', validateSignIn, isRequestValidated,signin);
router.post('/signout', signout);


//router.post('/profile', requiresSignin, (req, res) => {
//    res.status(200).json( {user: 'profile'})
// });

module.exports = router;
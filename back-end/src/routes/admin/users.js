const express = require('express');
const router = express.Router();
const {signup, signin, signout, } = require('../../controllers/admin/user');
const { requiresSignin } = require('../../middleware/middle');
const { validateRequest, isRequestValidated, validateSignIn } = require('../../validators/vali');


router.post('/admin/signup',validateRequest, isRequestValidated, signup);

router.post('/admin/signin',validateSignIn , isRequestValidated,signin);
router.post('/admin/signout',  requiresSignin,signout);


module.exports = router;
const {check, validationResult} = require('express-validator');



exports.validateRequest = [
    
        check('firstName').notEmpty().withMessage('firstName is Required'),
        check('lastName').notEmpty().withMessage('lastName is Required'),
        check('email').isEmail().withMessage('valid Email is required'),
        check('password').isLength({min: 6}).withMessage('password must be 6 characters'),
        
    ]

    exports.validateSignIn = [
        check('email').isEmail().withMessage('valid Email is required'),
        check('password').isLength({min: 6}).withMessage('password must be 6 characters'),
        
    ]




exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0 ){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}
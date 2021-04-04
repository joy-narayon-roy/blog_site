const User = require("./../models/user.js");

const {
    body
} = require("express-validator");


module.exports=[
    body('pre_pass').not().isEmpty().withMessage('Enter old password').trim(),
    body('new_pass').isLength({
        min:6
    }).withMessage('Password too short!').custom((value,{req})=>{
        if (value!==req.body.con_pass) {
            throw new Error("Confirm password don't match!")
        }
        return true
    }).trim(),
    body('con_pass').not().isEmpty().withMessage('Enter confirm password')
    ]
const User = require("./../models/user.js");
const bcrypt = require("./../module/bcrypt.js");


const {
    body
} = require("express-validator");

module.exports = [
    body('email_Input').isEmail().withMessage('Enter your E-mail.').custom(async (valu, {
        req
    })=> {
        let user = await User.findOne({
            email: req.body.email_Input
        })
        if (user) {
            let match = await bcrypt.compare(req.body.password_Input, user.password)
            if (match) {
                req.session.isLoggedIn = true
                req.session.userId = user._id
                req.session.save(err=>{
                    if (err) {
                        console.log(err)
                    }
                })
                return false
            } else {
                return Promise.reject('Invalid Information!')
            }
        } else {
            return Promise.reject('Invalid Information!')
        }
        return true
    }),
    body('password_Input').isLength({
        min: 1
    }).withMessage('Enter your password.'),
]
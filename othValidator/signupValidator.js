const User = require("./../models/user.js");

const {
    body
} = require("express-validator");


module.exports = [
    body('firstNameInput').not().isEmpty().withMessage('Enter First Name').trim(),
    body('lastNameInput').not().isEmpty().withMessage('Enter Last Name').trim(),
    body('phoneNumberInput').not().isEmpty().withMessage('Invalid Phone Number').trim(),
    body('birthDay').not().isEmpty().withMessage('Enter Your Birthday'),
    body('emailInput').isEmail().withMessage('Enter E-mail').custom(async (value, {
        req
    })=> {
        let user = await User.findOne({
            email: req.body.emailInput
        })
        if (user) {
            return Promise.reject('Email already existing')
        }
        return true
    }),
    body('passwordInput').isLength({
        min: 6
    }).withMessage('Short password').custom((value, {
            req
        })=> {
        if (value != req.body.confirmPasswordInput) {
            throw new Error('Password Not Matched')
        }
        return true
    }).trim()
]

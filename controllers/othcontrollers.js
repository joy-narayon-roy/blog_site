const User = require("./../models/user.js");
const Profile = require("./../models/profile.js");

const bcrypt = require("./../module/bcrypt.js");
const flash = require("../middleWere/Flash.js");

const {
    validationResult
} = require("express-validator");


function isEmptyObject(value) {
    return Object.keys(value).length === 0;
}


const getLogin = (req, res)=> {
    res.render('pages/login', {
        errors: false, value: {}, flashMessage: flash.getMessage(req)
    })
}

const postLogin = async (req, res)=> {

    let errors = validationResult(req).mapped()

    let value = {
        email_Input: req.body.email_Input,
        password: req.body.password_Input
    }
    if (!isEmptyObject(errors)) {
        req.flash('Failed', 'Please input valid information');
        res.render('pages/login', {
            errors, value, flashMessage: flash.getMessage(req)
        })
    } else {
        req.flash('Success', 'Successfully Loggedin');
        res.redirect('/')
    }
}


const getSignup = (req, res)=> {
    res.render('pages/signup', {
        errors: {}, value: {}})
}


const postSignup = async (req, res)=> {
    let errors = validationResult(req).mapped()

    let {
        firstNameInput,
        lastNameInput,
        phoneNumberInput,
        birthDay,
        emailInput,
        passwordInput
    } = req.body

    if (!isEmptyObject(errors)) {
        res.render('pages/signup', {
            errors, value: {
                firstNameInput, lastNameInput, phoneNumberInput, birthDay, emailInput, passwordInput
            }
        })
    } else {

        let newUser = new User({
            firstName: req.body.firstNameInput,
            lastName: req.body.lastNameInput,
            fullName: req.body.firstNameInput+' '+req.body.lastNameInput,
            phone: req.body.phoneNumberInput,
            birthday: req.body.birthDay,
            email: req.body.emailInput,
            password: await bcrypt.hash(req.body.passwordInput, 10)
        })
        newUser.save().then(info=> {

            let newProfile = new Profile({
                user: info._id,
                name: info.fullName,
                phone: info.phone,
                email: info.email,
                birthday: info.birthday
            })
            newProfile.save().then(ret=> {
                res.redirect('/Login')
            }).catch(e=> {
                console.log(e)})
        }).catch(err=> {
            console.log(err)
        })

    }
}


const logout = (req, res)=> {
    req.session.destroy(err=> {
        res.redirect('/')
    })
}

module.exports = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
}
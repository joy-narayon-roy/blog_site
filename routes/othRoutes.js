const router = require("express").Router();
const {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
} = require("./../controllers/othcontrollers.js");
const User = require("./../models/user.js");


const signupValidator = require("../othValidator/signupValidator.js");


const changePassGetController = require("./../controllers/changePassGetController.js");
const changePassPostController = require("./../controllers/changePassPostController.js");

const changePassValidator = require("../othValidator/changePassValidator.js");


const loginValidator = require("../othValidator/loginValidator.js");

const {
    isNotAuthenticated,
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");


router.get('/Login', isNotAuthenticated, getLogin)
router.post('/Login', loginValidator, postLogin)
router.get('/Signup', isNotAuthenticated, getSignup)
router.post('/Signup', signupValidator, postSignup)
router.get('/Logout', logout)
router.get('/Changepassword', isAuthenticated, changePassGetController)
router.post('/Changepassword', isAuthenticated,changePassValidator, changePassPostController)


module.exports = router
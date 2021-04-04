const router = require("express").Router()
const {
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");
const {
    getHome,
    getAbout
} = require("./../controllers/routeController.js");


router.get('/', isAuthenticated,getHome)

module.exports = router
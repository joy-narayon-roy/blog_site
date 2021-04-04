const router = require("express").Router();
const {
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");

const {
    getController
} = require("../controllers/exploreController.js");


router.get('/', isAuthenticated, getController)

module.exports = router
const router = require("express").Router()

const searchGetController = require("../controllers/searchGetController.js");

router.get('/',searchGetController)

module.exports = router
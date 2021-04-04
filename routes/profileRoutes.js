const router = require("express").Router()
const {
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");

const profileGetController = require("../controllers/profileGetController.js");
const editProfileGetController = require("../controllers/editProfileGetController.js");
const editProfilePostController = require("../controllers/editProfilePostController.js");
const uploadPicPostController = require("../controllers/uploadPicPostController.js");
const upload = require('../middleWere/uploadMiddleWear.js')
const path = require("path");

const postAuthProfileGetController = require("../controllers/postAuthProfileGetController.js");



router.get('/',isAuthenticated, profileGetController)
router.get('/Editprofile',isAuthenticated,editProfileGetController)
router.post('/Editprofile',editProfilePostController)
router.post('/Photo',upload.single('picture'),uploadPicPostController)
router.get('/:profileId',postAuthProfileGetController)

module.exports = router
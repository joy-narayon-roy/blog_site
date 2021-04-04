const router = require("express").Router()
const {
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");

const creatPostGetController = require("../controllers/creatPostGetController.js");
const creatPostPostController = require("../controllers/creatPostPostController.js");

const postImageController = require("../controllers/postImageController.js");
const upload = require('../middleWere/uploadMiddleWear.js')
const creatPostValidation = require("../othValidator/creatPostValidation.js");
const editPostGetController = require("../controllers/editPostGetController.js")
const editPostPostController = require("../controllers/editPostPostController.js")
var deletePostGetController = require("../controllers/deletePostGetController.js");

var allPostGetController = require("../controllers/allPostGetController.js");

const singlePostGetController = require("../controllers/singlePostGetController.js")




router.get('/Createpost', isAuthenticated, creatPostGetController)

router.post('/Createpost', isAuthenticated, upload.single('thumbImg'), creatPostValidation, creatPostPostController)

router.get('/Editpost/:id', isAuthenticated, creatPostValidation, editPostGetController)

router.post('/Editpost/:id', isAuthenticated, upload.single('thumbImg'), creatPostValidation, editPostPostController)

router.get('/Deletepost/:postId', isAuthenticated,deletePostGetController)

router.get('/', isAuthenticated, allPostGetController)

router.get('/:postId',isAuthenticated,singlePostGetController)

router.get('/*',(req,res)=>{
    res.send('Post Not Found')
})

module.exports = router
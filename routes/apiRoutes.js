const router = require("express").Router()
const {
    isAuthenticated
} = require("../middleWere/othMiddlewere.js");

const {
    creatComments,
    creatReplies
} = require("../controllers/commentApiController.js");

const {
    likes,
    dislike,
    bookmarkGetController
} = require("../controllers/likes&dislikesApiController.js");


router.post('/comment/:postId', isAuthenticated, creatComments)
router.post('/comment/replies/:commentId', isAuthenticated, creatReplies)

router.get('/like/:postId', isAuthenticated,likes)
router.get('/dislike/:postId', isAuthenticated,dislike)

router.get('/bookmark/:postId',isAuthenticated,bookmarkGetController)

module.exports = router
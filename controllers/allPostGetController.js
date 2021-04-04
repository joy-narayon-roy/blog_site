const Post = require("./../models/Post.js");

module.exports = async (req, res)=> {

    let posts = await Post.find({
        user: `${req.user.id}`
    })
    res.render('pages/post', {
        posts
    })
}
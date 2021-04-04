const Post = require("../models/Post.js");
const Comments = require('../models/Comments.js')
const Profile = require('../models/profile.js')



module.exports = async (req, res)=> {
    let {
        postId
    } = req.params

    let liked = false,
    disliked = false

    let post = await  Post.findById(postId)
    .populate({
        path: 'comments',
        populate: {
            path: 'profile',
            select: 'name profilePic'
        }
    }).populate({
        path: 'comments',
        populate: {
            path: 'replies',
            populate:{
                path:'profile',
                models:'Profile',
                select:'name profilePic'
            }
        }
    })

    let postUser = await Profile.findOne({
        user: post.user
    })

    if (post.like.includes(req.user._id)) {
        liked = true
    }

    if (post.dislike.includes(req.user._id)) {
        disliked = true
    }

    res.render('pages/singlePost', {
        post,
        postUser,
        liked,
        disliked
    })

}
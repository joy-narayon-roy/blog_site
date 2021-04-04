const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js")

const likes = async (req, res)=> {
    let {
        postId
    } = req.params
    try {

        let post = await Post.findById(postId)

        let like = null,
        likeNum,dislikeNum;

        if (post.dislike.includes(req.user._id)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislike': req.user._id
                }
            })
        }
        if (post.like.includes(req.user._id)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'like': req.user._id
                }
            })

            post = await Post.findById(postId)
            likeNum = post.like.length
            dislikeNum = post.dislike.length
            like = false
            
            res.status(200).json({
                like,
                likeNum,
                dislikeNum
            })
        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'like': req.user._id
                }
            })

            post = await Post.findById(postId)
            likeNum = post.like.length
            dislikeNum = post.dislike.length
            like = true
            
            res.status(200).json({
                like,
                likeNum,
                dislikeNum
            })
        }

    } catch (e) {
        console.log(e);
        res.status(403).json({
            errors: 'Server error !'
        })
    }
}
const dislike = async (req, res)=> {
    let {
        postId
    } = req.params
    try {
        let post = await Post.findById(postId)

        let dislike = null
        let dislikeNum,likeNum;

        if (post.like.includes(req.user._id)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'like': req.user._id
                }
            })
        }
        if (post.dislike.includes(req.user._id)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislike': req.user._id
                }
            })
            dislike = false
            post = await Post.findById(postId)
            likeNum = post.like.length
            dislikeNum = post.dislike.length
            
            res.status(200).json({
                dislike,
                dislikeNum,
                likeNum
            })

        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'dislike': req.user._id
                }
            })
            dislike = true
            post = await Post.findById(postId)
            likeNum = post.like.length
            dislikeNum = post.dislike.length
            
            res.status(200).json({
                dislike,
                dislikeNum,
                likeNum
            })
        }

    } catch (e) {
        console.log(e);
        res.status(403).json({
            errors: 'Server error !'
        })
    }
}


const bookmarkGetController = async (req, res)=> {
    let {
        postId
    } = req.params


    let {
        bookmarks
    } = await Profile.findOne({
            user: req.user._id
        })

    if (bookmarks.includes(postId)) {
        try {
            await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $pull: {
                    'bookmarks': postId
                }
            })
            res.status(200).json({
                bookmark: false
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: 'Some Error'
            })
        }
    } else {
        try {
            await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $push: {
                    'bookmarks': postId
                }
            })

            res.status(200).json({
                bookmark: true
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: 'Some Error'
            })
        }
    }
}

module.exports = {
    likes,
    dislike,
    bookmarkGetController
}
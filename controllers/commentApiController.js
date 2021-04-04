const Post = require("./../models/Post.js");
const Comments = require("./../models/Comments.js");
const Profile = require("./../models/profile.js");
const moment = require("moment");




const creatComments = async (req, res)=> {

    let {
        postId,
    } = req.params
    let {
        body
    } = req.body

    if (!req.user._id) {
        res.redirect('/Login')
    } else {
        try {
            let profile = await Profile.findOne({
                user: req.user._id
            })
            
            let newComments = new Comments({
                profile: profile._id,
                post: postId,
                body,
            })
            let createdComment = await newComments.save()
            
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    comments: createdComment._id
                }
            })
            /*let {
                profilePic
            } = profile*/

            let comment = await Comments.findById(createdComment._id)
            .populate({
                path: 'profile',
                select:'name profilePic'
            })
            .populate({
                path: 'replies',
                populate: {
                    path: 'profile',
                    select: 'name profilePic'
                }
            })
            
            let creatTime = moment(comment.createdAt).fromNow()

            if (comment) {
                res.status(201).json({
                    comment,
                    creatTime
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

}

const creatReplies = async (req, res)=> {
    let {
        commentId
    } = req.params
    let {body} = req.body

    if (!req.user) {
        return res.status(403).json({
            errors: 'Not authentic user!'
        })
    }

    let profile = await Profile.findOne({
            user: req.user._id
        })

    let reply = {
        profile:profile._id,
        body
    }

    try {
        await Comments.findOneAndUpdate({
            _id: commentId
        }, {
            $push: {
                'replies': reply
            }
        })
        
        
        
        res.status(201).json({
            ...reply,
            profile
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            errors: 'Server error !'
        })
    }
}


module.exports = {
    creatComments,
    creatReplies
}
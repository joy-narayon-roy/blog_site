const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js");

const fs = require("fs");


module.exports = async (req, res)=> {
    let postId = `${req.params.postId}`
    let userId = `${req.user._id}`


    let post = await Post.findOne({
        _id: postId,
        user: userId
    })

    let postThumImg = `${post.thumbImg}`

    if (fs.existsSync(`public/${postThumImg}`)) {
        fs.unlink(`./public/${postThumImg}`, (err, dat)=> {
            if (err) {
                console.error(err);
            }
        })
    }



    Post.findOneAndDelete({
        _id: postId,
        user: userId
    }).then(data=> {
        Profile.findOneAndUpdate({
            user: userId
        }, {
            $pull: {
                post: postId
            }
        }).then(data=> {
            req.flash('Success', 'Delete Post Successfully !');
                res.redirect('/')
        }).catch(e=> {
            console.log(e);
        })

    }).catch(e=> {
        console.log('\nSome Error in Delete Post Controllee');
        console.log(e);
    })
}
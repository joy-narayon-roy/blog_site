const Post = require("./../models/Post.js");
const flash = require("../middleWere/Flash.js");
const fs = require("fs");



module.exports = async (req, res)=> {
    try {

        let postId = `${req.params.id}`
        let userId = `${req.user._id}`

        let {
            postTittle,
            postBody,
            postTages
        } = req.body

        let post = await Post.findOne({
            _id: postId,
            user: userId
        })
        let thumbImg = `${post.thumbImg}`

        if (req.file) {
            thumbImg = `uploads/${req.file.filename}`
        }

        if (postTages) {
            postTages = postTages.split(',')
        }


        Post.findOneAndUpdate({
            user: userId,
            _id: postId,
        }, {
            $set: {
                postTittle,
                postBody,
                postTages,
                thumbImg
            }
        }).then(data=> {

            if (data.thumbImg != thumbImg) {
                if (data.thumbImg) {
                    if (fs.existsSync(`public/${data.thumbImg}`)) {
                        fs.unlink(`./public/${data.thumbImg}`, (err, dat)=> {
                            if (err) {
                                console.error(err);
                            }
                        })
                    }
                }
            }

            req.flash('Success',
                'Save Post Successfully !');
            res.redirect('/')
        }).catch(e=> {
            if (e) {
                console.log(e);
            }
        })


    } catch (e) {
        console.log('\n\nError!');
        console.log(e);
    }
}
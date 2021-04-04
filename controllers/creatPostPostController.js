const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js");
const flash = require("../middleWere/Flash.js");
const {
    validationResult
} = require("express-validator");

function isEmptyObject(value) {
    return Object.keys(value).length === 0;
}



module.exports = (req, res)=> {
    let errors = validationResult(req).mapped()
    let {
        postTittle,
        postBody,
        postTages
    } = req.body

    let value = {
        postTittle,
        postBody,
        postTages
    }

    if (!isEmptyObject(errors)) {
        res.render('pages/creatPost.ejs', {
            errors, value
        })

    } else {

        let user = req.user._id;
        let thumbImg;

        if (postTages) {
            postTages = postTages.split(',')
        }

        if (req.file) {
            thumbImg = `uploads/${req.file.filename}`
        } else {
            thumbImg = ''
        }

        let newPost = new Post({
            user, postTittle, postBody, postTages, thumbImg
        })
        newPost.save().then(data=> {
            Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $push: {
                    post: data._id
                }
            }).then(e=> {
                
            req.flash('Success', 'Creat Post Successfully !');
                res.redirect('/')
            })
        })
    }
}

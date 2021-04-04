const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js");

module.exports = async(req, res)=> {
    try {
        let post = await Post.findOne({
            _id: `${req.params.id}`,
            user: `${req.user.id}`
        })

        if (!post) {
            res.redirect('/Notfound');
        } else {
            let data = {
                postTittle: post.postTittle,
                postBody: post.postBody,
                postTages: post.postTages,
                thumbImg: post.thumbImg,
                id:post._id
            }
            
            let errors = false
            res.render('pages/editPost', {
                data, errors
            })
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }}
}




//Editpost/602be5652640ee34c735a13b
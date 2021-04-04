const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js")

const searchGetController = async (req, res)=> {
    let {
        terms
    } = req.query
    let filter = req.query.filter || 'all'

    let itemPerPage = 10
    let currentPage = parseInt(req.query.page) || 1

    
    let posts = await Post.find({
        $text:{
            $search:terms
        }
    })
    .skip((itemPerPage*currentPage)-itemPerPage)
    .limit(itemPerPage)
    
    let totalPosts= await Post.countDocuments({
        $text:{
            $search:terms
        }
    })
    
    let totalPages = totalPosts/itemPerPage 
    
    let {bookmarks} = await Profile.findOne({user:req.user._id})


    res.render('pages/searchResult', {
        filter,
        terms,
        posts,
        bookmarks,
        currentPage,
        totalPages
})
}

module.exports = searchGetController
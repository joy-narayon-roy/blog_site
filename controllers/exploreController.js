const Post = require("./../models/Post.js");
const Profile = require("./../models/profile.js")
const moment = require('moment')


function getDays(days) {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function generateFilterObj(filter) {
    let filterObj = {}
    let order = 1

    switch (filter) {
        case 'latest':

            break;

        case 'month':
            filterObj = {
                createdAt: {
                    $gt: getDays(30)
                }
            }
            order = -1
            break;

        case 'week':
            filterObj = {
                createdAt: {
                    $gt: getDays(7)
                }
            }
            order = -1
            break;

        case 'all':
            order = -1
            break;
    }

    return {
        filterObj,
        order
    }
}



const getController = async (req, res)=> {
    let filter = req.query.filter || 'all'
    let itemPerPage = 10
    let currentPage = parseInt(req.query.page) || 1

    let {
        filterObj,
        order
    } = generateFilterObj(filter.toLowerCase())

    let posts = await Post.find(filterObj).populate('user', 'fullName').sort(order == 1?'-createdAt': 'createdAt').skip((itemPerPage*currentPage)- itemPerPage).limit(itemPerPage)

    let totalPost = await Post.countDocuments()
    let totalPages = parseInt(Math.floor(totalPost/itemPerPage))
    
    let {bookmarks} = await Profile.findOne({user:req.user._id})

    res.render('pages/explore.ejs', {
        filter,
        posts, 
        bookmarks,
        currentPage,
        totalPages
})
}

module.exports = {
getController
}
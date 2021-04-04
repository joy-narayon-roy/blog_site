const User = require("./../models/user.js");
const Profile = require("./../models/profile.js");
const flash = require("../middleWere/Flash.js");

const getHome = async (req, res)=> {
    let profile = await Profile.findOne({
        user:req.user._id
    })
    .populate({
        path:'post',
        select: 'postTittle thumbImg'
    })
    .populate('user','fullName')
    .populate({
        path:'bookmarks',
        select:'postTittle thumbImg'
    })
    
    
    let flashMessage = flash.getMessage(req);
    res.render('pages/index.ejs', {
        flashMessage,
        posts:profile.post,
        bookmarks:profile.bookmarks
    })
}

const getAbout = (req, res)=> {
    res.render('pages/about.ejs')
}
module.exports = {
    getHome,
    getAbout
}
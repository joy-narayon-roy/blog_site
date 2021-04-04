const User = require("./../models/user.js");
var Profile = require("./../models/profile.js");


module.exports = async (req, res)=> {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        .populate({
            path:'bookmarks',
            populate:{
                path:'post',
                select:'postTittle _id'
            }
        })
        
        res.render('pages/profile', {
            profile
        })
    } catch (e) {
        return e
    }
}
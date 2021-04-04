const User = require("./../models/user.js");
var Profile = require("./../models/profile.js");

module.exports = async (req, res)=> {
    let profile = await Profile.findOne({
        user: req.user._id
    })

    res.render('pages/editProfile',{profile})
}
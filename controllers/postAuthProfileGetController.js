const Profile = require("./../models/profile.js");


module.exports = async (req, res)=> {
    let {
        profileId
    } = req.params
    let profile = await Profile.findOne({
        _id: profileId
    })
    .populate('post')
    
    if (`${profile.user}`===`${req.user._id}`) {
        res.redirect('/Profile')
    } else {
        res.render('pages/authProfile', {
            profile
        })
    }
}
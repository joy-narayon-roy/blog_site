const User = require("./../models/user.js");
var Profile = require("./../models/profile.js");


module.exports = (req, res)=> {
    let {
        name,
        phone,
        email,
        country,
        fburl,
        githuburl,
        siteurl
    } = req.body
    
    
    Profile.findOneAndUpdate({
        user: req.user._id
    }, {
        $set: {
            name, phone, email, country, fburl, githuburl, siteurl
        }}).then(e=> {
        res.redirect('/Profile')
    }).catch(e=> {
        console.log(e);
    })
}
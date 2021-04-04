const Profile = require("./../models/profile.js");
const fs = require("fs");



module.exports = (req, res, next)=> {
    Profile.findOne({
        user: req.user._id
    }).then(data=> {
        if (fs.existsSync(`public/${data.profilePic}`)) {
            fs.unlink(`./public/${data.profilePic}`, (err, dat)=> {
                if (err) {
                    console.error(err);
                }
            })
        }
    })




    Profile.findOneAndUpdate({
        user: req.user._id
    }, {
        $set: {
            profilePic: `uploads/${req.file.filename}`
        }
    }).then(e=> {
        res.redirect('/Profile')}).catch(e=> {})
}
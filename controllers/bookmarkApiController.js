const Profile = require("./../models/profile.js");



const addBookmarkGetController = async (req, res)=> {
    let link = req.params
    try {
        await Profile.findOneAndUpdate({
            _id: req.user._id
        }, {
            $push: {
                bookmarks: link
            }
        })
        
        res.status(200).json({
            add:true
        })
        
    } catch (e) {}
}

const removeBookmarkGetController = async (req, res)=> {
    let link = req.params
    try {
        await Profile.findOneAndUpdate({
            _id: req.user._id
        }, {
            $pull: {
                bookmarks: link
            }
        })
        
        res.status(200).json({
            remove:true
        })
    } catch (e) {
        res.status(500).json({
            error:'Internal Server Error!'
        })
    }
}
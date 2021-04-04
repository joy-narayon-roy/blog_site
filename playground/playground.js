const router = require("express").Router()
const upload = require('../middleWere/uploadMiddleWear.js')
var path = require("path");
const Profile = require('../models/profile.js')


router.get('/', async (req, res)=> {
    let profile = await Profile.findOne({
        user: req.user._id
    })
    if (profile) {
        let picture = profile.profilePic
        res.render('pgfrom', {profile,picture})
    }else{
        res.render('pgfrom',{profile:false})
    }
})
router.post('/', upload.single('my-File'), (req, res)=> {
    console.clear()
   // console.log(req.file.path.replace('public',''));
    
    let newProfile = new Profile({
        user: req.user._id,
        profilePic: req.file.path.replace('public','')
    })
    newProfile.save().then(e=> {
        console.log(e);
    })
    

})

/*


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/../views/pagesInHtml/profile.html'))
})
*/


module.exports = router 
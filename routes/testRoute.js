const router = require("express").Router()
const Profile = require("../models/profile.js");


router.get('/:id', (req, res)=> {
    /*
    const id =`${req.params.id}`
    Profile.findOneAndUpdate({
        user:`${req.user._id}`
    },{
        $pull:{
            post:id
        }
    }).then(data=>{
    }).catch(e=>{
        console.log(e);
    })
    */
})



module.exports = router
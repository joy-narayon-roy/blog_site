const router = require("express").Router()

router.get('/',(req,res)=>{
    res.send('Page Not Found')
})


module.exports = router
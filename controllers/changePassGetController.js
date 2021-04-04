const flash = require("../middleWere/Flash.js");

const {
    validationResult
} = require("express-validator");


module.exports=(req,res)=>{
    let flashMessage = flash.getMessage(req);
    
    res.render('pages/changePassword',{
        flashMessage,
        errors:false,
        value: false
    })
}
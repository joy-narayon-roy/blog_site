var User = require("../models/user.js");

exports.bindUserRequest = ()=> {
    return async (req, res, next)=> {
        if (!req.session.isLoggedIn) {
            return next()
        } else {
            try {
                let user = await User.findById(req.session.userId)
                req.user = user
                next()
            } catch (e) {
                console.log(e)
            }
        }
    }
}
exports.isAuthenticated = (req, res, next)=> {
    if (!req.session.isLoggedIn) {
        return res.redirect('/Login')
    }
    next()
}

exports.isNotAuthenticated=(req,res,next)=>{
    if (req.session.isLoggedIn) {
        return res.redirect('/')
    }else{
        next()
    }
}
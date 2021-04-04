const User = require("./../models/user.js");

const bcrypt = require("./../module/bcrypt.js");
const flash = require("../middleWere/Flash.js");
const {
    validationResult
} = require("express-validator");

function isEmptyObject(value) {
    return Object.keys(value).length === 0;
}


module.exports = async (req, res)=> {
    let value = {
        pre_pass: req.body.pre_pass,
        new_pass: req.body.new_pass,
        con_pass: req.body.con_pass
    }

    let errors = validationResult(req).mapped()

    let flashMessage = flash.getMessage(req);

    if (!isEmptyObject(errors)) {
        res.render('pages/changePassword', {
            flashMessage,
            errors,
            value
        })

    } else {
        let match = await bcrypt.compare(value.pre_pass, req.user.password)

        if (match) {
            value.con_pass = await bcrypt.hash(value.con_pass, 10)
            try {
            let data =  await User.findOneAndUpdate({
                _id: req.user._id
            },{$set:{
                password:value.con_pass
            }})
                req.flash('Success','Password change successfully')
                res.redirect('/')
            } catch (e) {
                return console.log(e);
            }
        } else {
            req.flash('Failed', "Old password doesn't match !")

            flashMessage = flash.getMessage(req)

            res.render("pages/changePassword", {
                flashMessage,
                errors,
                value
            })
        }
        

        /*
        if (value.pre_pass !== req.user.password) {
            req.flash('Failed', "Old password doesn't match !")

            let flashMessage = flash.getMessage(req)

            res.render("pages/changePassword", {
                flashMessage,
                errors,
                value
            })
        } else if (value.pre_pass === req.user.password) {
            try {
            let data =  await User.findOneAndUpdate({
                _id: req.user._id
            },{$set:{
                password:value.con_pass
            }})
                console.log(data);
            } catch (e) {
                return console.log(e);
            }
        }
        */
    }
}
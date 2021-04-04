const {Schema,model} = require("mongoose");
const userSchema=new Schema({
    firstName:{
        type:String,
        trim:true,
        required: true
    },
    lastName:{
        type:String,
        trim:true,
        required: true
    },
    fullName:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        trim:true,
        required:true
    },
    birthday: {
        type:String,
        trim:true,
        required:true
    },
    email: {
        type:String,
        trim:true,
        required:true
    },
    profile: {
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    password: {
        type:String,
        required:true
    }
})
const User=model('User',userSchema)
module.exports=User
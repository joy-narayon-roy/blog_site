const {
    Schema,
    model
} = require("mongoose");

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        req: true
    },
    name: {
        type: String,
        req: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    birthday: {
        type: String
    },
    fburl: {
        type: String
    },
    githuburl: {
        type: String
    },
    siteurl: {
        type: String
    },
    profilePic: {
        type: String,
        def: '/uploads/default.png'
    },
    country: {
        type: String
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
    bookmarks: [{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }]
})

const Profile = model('Profile', profileSchema)
module.exports = Profile
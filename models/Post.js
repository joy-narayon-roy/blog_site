const {
    Schema,
    model
} = require("mongoose");

const postScheme = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        req: true
    },
    postTittle: {
        type: String,
        trim: true,
        required: true
    },
    postBody: {
        type: String,
        trim: true,
        required: true
    },
    postTages: [{
        type: String,
        required: true
    }],
    thumbImg: {
        type: String
    },
    like: [{
        type: String
    }],
    dislike: [{
        type: String
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }]
}, {
    timestamps: true
})

postScheme.index({
    postTittle: 'text',
    postBody: 'text',
    postTages: 'text'
}, {
    weights: {
        postTittle: 5,
        postTages: 5,
        postBody: 2
    }
})

const Post = model('Post', postScheme)
module.exports = Post
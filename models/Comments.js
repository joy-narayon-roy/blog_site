const {
    Schema,
    model
} = require("mongoose")

const commentSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    replies: [{
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        body: {
            type: String,
            trim: true,
            required: true
        }
    }],
}, {
    timestamps: true
})

const Comments = model('Comments', commentSchema)

module.exports = Comments
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
    senderID:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    recipientID: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    replies: [
        {
            senderID: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            recipientID: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    } 
})

module.exports = Message = mongoose.model('message', MessageSchema);
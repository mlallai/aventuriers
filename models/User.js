const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reset_password_token: {
        type: String
      },
      reset_password_expires: {
        type: Date
      },
    avatar: {
        type: String,
        // required: true
    },
    defaultAvatar: {
        type: String,
        // required: true
    },
    // sports: {
    //     type: [String],
    //     // required: true
    // },
    date: {
        type: Date,
        default: Date.now
    },
    adventures: [{ type: Schema.Types.ObjectId, ref: 'Adventure' }]
});

module.exports = User = mongoose.model('users', UserSchema);
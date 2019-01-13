const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdventureSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'profile'
    },
    title: {
        type: String,
        required: true
    },
    mainActivity: {
        type: [String],
        required: true
    },
    recurring: {
        type: Boolean,
        default: false
    },
    secondActivity: {
        type: [String],
    },
    summary: {
        type: String,
        required: false
    },
    level: {
        type: [String],
        required: true
    },
    requiredPeople: {
        type: Number
    },
    country: {
        type: String,
    },
    location: {
        type: Object,
        required: true
    },
    from: {
        type: Date,
        // required: true
    },
    duration: {
        type: Number
    },
    // pictures: [
    //     {
    //       imgUri: {
    //         type: String
    //       },
    //       pictureTitle: {
    //         type: String
    //       },
    //       pictureDesc: {
    //         type: String
    //       },
    //       date: {
    //         type: Date,
    //         default: Date.now
    //       }
    //     }
    //   ],
    pictures : {
        type: [String],
        required: false
    },
    defaultPictures : {
        type: [String],
        required: false
    },
      likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            avatar: {
                type: String
            },
            defaultAvatar: {
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
});

module.exports = Adventure = mongoose.model('adventure', AdventureSchema);
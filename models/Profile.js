const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    age: {
        type: Number,
    },
    desc: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    location: {
        type: Object,
        required: true
    },
    sports: {
        type: [String],
        // required: true
    },
    experience: [
        {
            title: {
                type: String,
                // required: true
            },
            mainActivity: {
                type: [String],
                required: true
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
            country: {
                type: String,
            },
            location: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                // required: true
            },
            duration: {
                type: Number
            },
            pictures : {
                type: [String],
                required: false
            },
            defaultPictures : {
                type: [String],
                required: false
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    social: {
        website: {
            type: String
          },
        facebook: {
          type: String
        },
        instagram: {
            type: String
          },
        youtube: {
          type: String
        },

      },
    pictures: [
        {
          imgUri: {
            type: String
          },
          pictureTitle: {
            type: String
          },
          pictureDesc: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
    date: {
        type: Date,
        default: Date.now
    },
    adventures: [{ type: Schema.Types.ObjectId, ref: 'Adventure' }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
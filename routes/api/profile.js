const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');


// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route GET api/profile/test
// @ desc Tests profile route
// @access public
router.get('/test', (req, res) => res.json({
    msg: 'Profile works'
}));

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['firstName', 'lastName', 'email', 'avatar', 'defaultAvatar'])
    .then(profiles => {
        if (!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors)
        }

        res.json(profiles);
    })
        .catch(err => res.status(404).json({profile: 'There are no profiles'}))
})

// // @route GET api/profile/id/:id
// // @desc Get profile by id
// // @access Public - Anyone can see profiles !
// router.get('/profile/:id', (req, res) => {
//     const errors = {};
    
//     Profile.findOne({ _id: req.params._id })
//     .populate('user', ['firstName', 'lastName', 'avatar'])
//     .then(profile => {
//         if(!profile) {
//             errors.noprofile = 'There is no profile for this user';
//             res.status(404).json(errors);
//         }

//         res.json(profile);
//     })
//     .catch(err => res.status(404).json(err));
// })

// @route GET api/profile/user/:user
// @desc Get profile by user ID
// @access Public - Anyone can see users !
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    
    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['firstName', 'lastName', 'avatar', 'email', 'defaultAvatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
})

// @route POST api/profile/
// @desc Create User Profile
// @access Private

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("on passe dans la route create profile")

    const {
        errors,
        isValid
    } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
        console.log("on est dans le cas invalide")
        // Return any errors with 400 status
        return res.status(400).json(errors);
        console.log(errors)
    }

    console.log("on est avant la const profileFields")
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.desc) profileFields.desc = req.body.desc;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.location) profileFields.location = req.body.location;

    // Sports Array
    profileFields.sports = [];
    if (req.body.sports !== null) {
        req.body.sports.map(sport => {
            profileFields.sports.push(sport)
        })
    };

    // Social
    profileFields.social = {};
    if (req.body.website) profileFields.social.website = req.body.website;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;

    console.log("profileFields :", profileFields)
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                // Update
                console.log("on est avant l'update")
                Profile.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: profileFields
                    }, {
                        upsert: true, new: true 
                        // returnNewDocument: true
                        // new: true
                        // returnOriginal: false
                    })
                    .then(profile => res.json(profile));
                        console.log("profile après le then dans l'update", profile)

            } else {
                // Save profile
                new Profile(profileFields).save().then(profile => res.json(profile));
                console.log("res après le then dans la la création", profile)
            }
        });
});

// @route GET api/profile/
// @desc Get Current User Profile
// @access Private

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {};
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['firstName', 'lastName', 'avatar', 'defaultAvatar' ])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "No Profile for this user";
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false}), (req, res) => {
    const { errors, isValid} = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
    .then(profile => {
    
        // Get fields
    const experienceFields = {};
    // experienceFields.user = req.user.id;
    if (req.body.title) experienceFields.title = req.body.title;
    if (req.body.mainActivity) experienceFields.mainActivity = req.body.mainActivity;
    if (req.body.summary) experienceFields.summary = req.body.summary;
    if (req.body.level) experienceFields.level = req.body.level;
    if (req.body.country) experienceFields.country = req.body.country;
    if (req.body.location) experienceFields.location = req.body.location.place.split(',')[0];
    if (req.body.from) experienceFields.from = req.body.from;
    if (req.body.duration) experienceFields.duration = req.body.duration;
     // Pictures
     experienceFields.pictures = [];
     if (req.body.uploadedPics !== null) {
         req.body.uploadedPics.map(picture => {
            experienceFields.pictures.push(picture)
         })
     };
     
          // Default Pictures
          experienceFields.defaultPictures = [];
          if (req.body.mainActivity === "Alpinisme"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Alpinism.jpg")
          }
          if (req.body.mainActivity === "Canyoning"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Canyoning.jpg")
          }
          if (req.body.mainActivity === "Cyclisme"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Cycling.jpg")
          }
          if (req.body.mainActivity === "Equitation"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Horse_riding.jpg")
          }
          if (req.body.mainActivity === "Escalade"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Climbing.jpg")
          }
          if (req.body.mainActivity === "Canoë-kayak"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Kayaking.jpg")
          }
          if (req.body.mainActivity === "Kitesurf"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Kitesurf.jpg")
          }
          if (req.body.mainActivity === "Paddle"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Paddle.jpg")
          }
          if (req.body.mainActivity === "Parachute"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Parachute.jpg")
          }
          if (req.body.mainActivity === "Parapente"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Paragliding.jpg")
          }
          if (req.body.mainActivity === "Planche à voile"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Windsurfing.jpg")
          }
          if (req.body.mainActivity === "Plongée"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Diving.jpg")
          }
          if (req.body.mainActivity === "Randonnée"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking2.jpg")
          }
          if (req.body.mainActivity === "Ski"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Skiing.jpg")
          }
          if (req.body.mainActivity === "Ski de fond"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Ski_touring.jpg")
          }
          if (req.body.mainActivity === "Ski de randonnée"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Ski_touring_2.jpg")
          }
          if (req.body.mainActivity === "Snowboard"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Snowboarding.jpg")
          }
          if (req.body.mainActivity === "Surf"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Surf.jpg")
          }
          if (req.body.mainActivity === "Trail"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Trail.jpg")
          }
          if (req.body.mainActivity === "Trek"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking.jpg")
          }
          if (req.body.mainActivity === "Voile"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Sailing.jpg")
          }
          if (req.body.mainActivity === "Voyage à cheval"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Horse_riding.jpg")
          }
          if (req.body.mainActivity === "Voyage à pied"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking2.jpg")
          }
          if (req.body.mainActivity === "Voyage à vélo"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Cycling.jpg")
          }
          if (req.body.mainActivity === "VTT"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Mountain_bike.jpg")
          }
          if (req.body.mainActivity === "Wakeboard"){
            experienceFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Wakeboard.jpg")
          }

        // Add to experience Array
        profile.experience.unshift(experienceFields);

        profile.save().then(profile => res.json(profile));
    })
})

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false}), (req, res) => {

    Profile.findOne({user: req.user.id})
    .then(profile => {
        // Get Remove Index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

            // Splice out of array

            profile.experience.splice(removeIndex, 1);

            // Save
            profile.save().then(profile => res.json(profile))


    })
        .catch(err => res.status(404).json(err))
})

// @route DELETE api/profile/
// @desc Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false}),(req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => {
                    res.json({ success: true })
                })
        })

})

module.exports = router;
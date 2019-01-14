const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Load Validation
const validateAdventureInput = require('../../validation/adventure');
const validateAdventureCommentInput = require('../../validation/adventureComment');

// Load Adventure Model
const Adventure = require('../../models/Adventure');
// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// Set nodemailer options
const email = require('../../config/keys').mailerEmailId;
const pass = require('../../config/keys').mailerPassword;

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: email,
      pass: pass
    }
  });
  
  const handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./routes/templates'),
    extName: '.html'
  };
  
  smtpTransport.use('compile', hbs(handlebarsOptions));


// @route GET api/adventures/test
// @ desc Tests adventures route
// @access public
router.get('/test', (req, res) => res.json({msg: 'Adventures works'}))

// @route GET api/adventures
// @desc Get Adventure
// @access Public

router.get('/', (req, res) => {
    Adventure.find()
        .sort({date: -1})
        .then(adventures => res.json(adventures))
        .catch(err => res.status(404).json({noadventurefound: 'No Adventure found'}));
})

// @route GET api/adventures/:id
// @desc Get Adventure by Id
// @access Public

router.get('/adventure/:id', (req, res) => {
    Adventure.findById(req.params.id)
        .populate(
            'user', ['firstName', 'lastName', 'email', 'avatar', 'defaultAvatar'],
        )
        .populate(
            'profile',['age', 'location', 'desc', 'country', 'sports']
        )
        // .populate('profile', ['age', 'location', 'country', 'sports'])
        .then(adventure => res.json(adventure))
        .catch(err => res.status(404).json({noadventurefound: 'No adventure found with that ID'}));
});

// @route   GET api/adventures/user
// @desc    Get all the adventures registered by a user
// @access  Private (user)
router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {

          Adventure.find({user: req.user.id})
            .sort({ date: -1 })
            .then(adventure => res.json(adventure))
            .catch(err => res.status(404).json({ noadventurefound: 'No adventures found' }));
        // });
      });


// @route GET api/adventures/all
// @desc Get all adventures
// @access Public
// router.get('/all', (req, res) => {
//     const errors = {};
//     Adventure.find()
//     .populate('user', ['firstName', 'lastName', 'email', 'avatar'])
//     .then(adventures => {
//         if (!adventures) {
//             errors.noadventure = 'There are no adventure';
//             return res.status(404).json(errors)
//         }

//         res.json(adventures);
//     })
//     .catch(err => res.status(404).json({profile: 'There are no adventures'}))
// });

// @route POST api/adventures/
// @desc Create User Adventure
// @access Private

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validateAdventureInput(req.body);

    // Check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    // Get fields
    const adventureFields = {};
    adventureFields.user = req.user.id;
    Profile.findOne({ user: req.user.id })
    .then(profile => {adventureFields.profile = profile})

    if (req.body.title) adventureFields.title = req.body.title;
    if (req.body.mainActivity) adventureFields.mainActivity = req.body.mainActivity;
    if (req.body.recurring) adventureFields.recurring = req.body.recurring;
    if (req.body.summary) adventureFields.summary = req.body.summary;
    if (req.body.level) adventureFields.level = req.body.level;
    if (req.body.requiredPeople) adventureFields.requiredPeople = req.body.requiredPeople;
    if (req.body.country) adventureFields.country = req.body.country;
    if (req.body.location) adventureFields.location = req.body.location.place.split(',')[0];
    if (req.body.from) adventureFields.from = req.body.from;
    if (req.body.duration) adventureFields.duration = req.body.duration;
     // Pictures
     adventureFields.pictures = [];
     if (req.body.uploadedPics !== null) {
         req.body.uploadedPics.map(picture => {
             adventureFields.pictures.push(picture)
         })
     };

     // Default Pictures
     adventureFields.defaultPictures = [];
     if (req.body.mainActivity === "Alpinisme"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Alpinism.jpg")
     }
     if (req.body.mainActivity === "Canyoning"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Canyoning.jpg")
     }
     if (req.body.mainActivity === "Cyclisme"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Cycling.jpg")
     }
     if (req.body.mainActivity === "Equitation"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Horse_riding.jpg")
     }
     if (req.body.mainActivity === "Escalade"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Climbing.jpg")
     }
     if (req.body.mainActivity === "Canoë-kayak"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Kayaking.jpg")
     }
     if (req.body.mainActivity === "Kitesurf"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Kitesurf.jpg")
     }
     if (req.body.mainActivity === "Paddle"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Paddle.jpg")
     }
     if (req.body.mainActivity === "Parachute"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Parachute.jpg")
     }
     if (req.body.mainActivity === "Parapente"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Paragliding.jpg")
     }
     if (req.body.mainActivity === "Planche à voile"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Windsurfing.jpg")
     }
     if (req.body.mainActivity === "Plongée"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Diving.jpg")
     }
     if (req.body.mainActivity === "Randonnée"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking2.jpg")
     }
     if (req.body.mainActivity === "Ski"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Skiing.jpg")
     }
     if (req.body.mainActivity === "Ski de fond"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Ski_touring.jpg")
     }
     if (req.body.mainActivity === "Ski de randonnée"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Ski_touring_2.jpg")
     }
     if (req.body.mainActivity === "Snowboard"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Snowboarding.jpg")
     }
     if (req.body.mainActivity === "Surf"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Surf.jpg")
     }
     if (req.body.mainActivity === "Trail"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Trail.jpg")
     }
     if (req.body.mainActivity === "Trek"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking.jpg")
     }
     if (req.body.mainActivity === "Voile"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874588/Sailing.jpg")
     }
     if (req.body.mainActivity === "Voyage à cheval"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Horse_riding.jpg")
     }
     if (req.body.mainActivity === "Voyage à pied"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Hiking2.jpg")
     }
     if (req.body.mainActivity === "Voyage à vélo"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874586/Cycling.jpg")
     }
     if (req.body.mainActivity === "VTT"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Mountain_bike.jpg")
     }
     if (req.body.mainActivity === "Wakeboard"){
        adventureFields.defaultPictures.push("https://res.cloudinary.com/adventurer/image/upload/v1546874587/Wakeboard.jpg")
     }

    Adventure.findById(req.params.id)
        .then(adventure => {
            if (adventure) {
                // Update
                Adventure.findOneAndUpdate({
                        user: req.user.id
                    }, {
                        $set: adventureFields
                    }, {
                        upsert: true, new: true 
                    })
                    .then(adventure => res.json(adventure));

            } else {
                // Save adventure
                new Adventure(adventureFields).save().then(adventure => res.json(adventure));
            }
        });
});

// @route   POST api/adventures/update
// @desc    Update adventure as a user
// @access  Private
router.post(
    '/update',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateAdventureInput(req.body);
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
      //Get User ID
      User.findOne({ user: req.user.id })
        .then(user => {
          // Get fields
    const adventureFields = {};
    adventureFields.user = req.user.id;
    if (req.body.title) adventureFields.title = req.body.title;
    if (req.body.mainActivity) adventureFields.mainActivity = req.body.mainActivity;
    if (req.body.recurring) adventureFields.recurring = req.body.recurring;
    // if (req.body.secondActivity) adventureFields.secondActivity = req.body.secondActivity.split(',');
    if (req.body.summary) adventureFields.summary = req.body.summary;
    if (req.body.level) adventureFields.level = req.body.level;
    if (req.body.requiredPeople) adventureFields.requiredPeople = req.body.requiredPeople;
    if (req.body.country) adventureFields.country = req.body.country;
    if (req.body.location) adventureFields.location = req.body.location;
    if (req.body.from) adventureFields.from = req.body.from;
    if (req.body.duration) adventureFields.duration = req.body.duration;

   
          //Update adventures with same user
          Adventure.findOneAndUpdate(
            { user: adventureFields.user, id: req.body.id },
            { $set: adventureFields },
            { new: true })
            .then(adventure => res.json(adventure));
        });
    });

// @route DELETE api/adventures/:id
// @desc Delete Adventure
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("on passe dans la route delete adventure")
    User.findOne({user: req.user.id})
        .then(user => {
            Adventure.findById(req.params.id)
            .then(adventure => {
                console.log("on est dans la route adventure")
                // Check for adventure owner. Need to stringify 'user' coz it does not come as a String
                if(adventure.user.toString() !== req.user.id) {
                    // return 401 status, which is an authorization status
                    return res.status(401).json({ notauthorized: 'User not authorized to delete Adventure'})
                }

                // Delete

                adventure.remove().then(() => res.json({success: true}));
            })
            .catch(err => res.status(404).json({adventurenotfound: "No Adventure found"}));
        })
});

// @route POST api/adventures/like/:id
// @desc Like adventure
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({user: req.user.id})
        .then(user => {
            Adventure.findById(req.params.id)
            .then(adventure => {
            // Check if the user has already liked the adventure
            if (adventure.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked: "L'utilisateur a déjà enregistré cette aventure"})
            }

            // Add user id to likes array
            adventure.likes.unshift({ user: req.user.id })

            // Save like. Note that in this case a user can like his own adventure
            adventure.save().then(adventure => res.json(adventure));
            })
            .catch(err => res.status(404).json({adventurenotfound: "No adventure found"}));
        })
});

// @route POST api/adventures/unlike/:id
// @desc Unlike Adventure
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({user: req.user.id})
        .then(user => {
            Adventure.findById(req.params.id)
            .then(adventure => {
            // Check if the user has already likes the adventure
            if (adventure.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({notliked: "you have not yet liked this adventure"})
            }

            // Get remove index
            const removeIndex = adventure.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)

            // Splice out of array
            adventure.likes.splice(removeIndex, 1);

            //Save
            adventure.save().then(adventure => res.json(adventure));
            })

            .catch(err => res.status(404).json({adventurenotfound: "No adventure found"}));
        })
});

  // @route   POST api/adventures/wishlist
  // @desc    Get all the adventures liked by the user
  // @access  Private (user)
  router.get(
    '/wishlist',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Get list of adventures with the user's id in their like table
        Adventure.find({ likes: { $elemMatch: { user: req.user.id } }})
          .sort({ date: -1 })
          .then(adventure => res.json(adventure))
          .catch(err => res.status(404).json({ noadventurefound: 'No adventures found' }));
  });


// @route POST api/adventure/comment/:id
// @desc Add comment to adventure
// @access Private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => { 
    
    const {errors, isValid} = validateAdventureCommentInput(req.body);

    // Check Validation
    // if (!isValid) {
    //     // If any errors, send 404 with error
    //     return res.status(400).json(errors);
    // };
    Adventure.findById(req.params.id)
    .then(adventure => {
        const newComment = {
            text: req.body.text,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            avatar: req.body.avatar,
            defaultAvatar: req.body.defaultAvatar,
            user: req.user.id
        }

        // Add to comments array
        adventure.comments.unshift(newComment)

        // Save
        adventure.save().then(adventure => res.json(adventure));
        console.log("adventure saved after comment", adventure.user)
            // Find Recipient to send him a mail notif
    User.findOne({
        _id: adventure.user
    })
    .then(user => {
let data = {
    to: user.email,
    from: email,
    template: 'message-email',
    subject: 'Commentaire reçu sur Aventuriers.co !',
    context: {
        url: 'http://localhost:3000/messages',
        name: user.firstName,
        message: req.body.text
    }
  };
  smtpTransport.sendMail(data, (err) => {
    if(!err) {
      return res.json({ message: 'Kindly check your email for further instructions' });
    } 
    // else {
    //   return done(err);
    // }
  });
});

    })
    .catch(err => res.status(404).json({ adventurenotfound: "No adventure found !" }));
});

// @route DELETE api/adventures/comment/:id/:comment_id
// @desc Remove comment from adventure
// @access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Adventure.findById(req.params.id)
    .then(adventure => {
        // Check to see if the comment exists
        if (adventure.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({ commentnotexists: 'Comment does not exist' })
        }

        // get remove index
        const removeIndex = adventure.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id)

            // Splice out of the array
            adventure.comments.splice(removeIndex, 1)

            // Save
            adventure.save().then(adventure => res.json(adventure));

    })
    .catch(err => res.status(404).json({ adventurenotfound: "No adventure found !" }));
});

 // @route   GET api/adventures/latest
// @desc    Get latest adventures for landing page
// @access  Public
  router.get('/latest', (req, res) => {
    Adventure.find()
      .sort({ date: -1 })
      .limit(4)
      .then(adventure => res.json(adventure))
      .catch(err => res.status(404).json({ adventurenotfound: 'No adventure found' }));
  });

module.exports = router;
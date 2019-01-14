const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateForgotPasswordInput = require('../../validation/forgot-password');
const validateResetPasswordInput = require('../../validation/reset-password');

// Load User model
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
  

// @route POST api/users/register
// @ desc register user route
// @access public
router.post('/register', (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email déjà utilisé';
                return res.status(400).json(errors);
            } else {
                // const avatar = gravatar.url(req.body.email, {
                //     s: '200', //Size
                //     r: 'pg', // Rating
                //     d: 'mm' // Default
                // });
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    defaultAvatar: req.body.firstName[0].toUpperCase() + req.body.lastName[0].toUpperCase(),
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                            doWeSendBackToken(req, res, user);
                            let data = {
                              to: user.email,
                              from: email,
                              template: 'inscription-email',
                              subject: 'Bienvenue sur Aventuriers.co !',
                              context: {
                                url: 'http://localhost:3000/profile',
                                name: user.firstName,
                                message: req.body.text
                            }
                            };
                            smtpTransport.sendMail(data, (err) => {
                              if(!err) {
                                return res.json({ message: 'Kindly check your email for further instructions' });
                              } else {
                                return done(err);
                              }
                            });
                          })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// // @route   POST api/users/sports
// // @desc    Add sports to user 
// // @access  Private

// router.post('/sports', passport.authenticate('jwt', { session: false}), (req, res) => {

//   User.findOne({user: req.user.id})
//   .then(user => {
    
//     // Fill in userSports Array
//     userSports = [];
//     if (req.body.userSports !== null) {
//         req.body.userSports.map(sport => {
//           userSports.push(sport)
//         })
//     };

//     // Save userSports Array as Sports Array in User 
//     user.sports.unshift(userSports);

//     user.save().then(user => res.json(user));

//   });

// });

// @route   POST api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post('/login', (req, res) => {

    // Are inputs valid?
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }
 
   const email = req.body.email;
 
   // Is user exists in DB?
   User
     .findOne({ email })
     .then(user => {
 
       if(!user) {
         errors.email = 'Aucun compte existant à cette adresse';
         return res.status(400).json(errors);
       } else {
       doWeSendBackToken(req, res, user);
       }
     });
 });

 // @route   POST api/users/forgot-password
// @desc    Reset the user password
// @access  Private
router.post('/forgot-password', (req, res) => {
    const { errors, isValid } = validateForgotPasswordInput(req.body);
  
    if(!isValid) {
      return res.status(400).json(errors);
    }
    
    async.waterfall([
      (done) => {
        User
          .findOne({ email: req.body.email })
          .exec((err, user) => {
            if(user) {
              done(err, user);
            } else {
              // done('User not found');
              errors.email = 'Aucun compte à cette adresse.';
              return res.status(404).json(errors);
            }
          });
      },
      (user, done) => {
        // Create the random token
        crypto.randomBytes(20, (err, buffer) => {
          let token = buffer.toString('hex');
          done (err, user, token);
        });
      },
      (user, token, done) => {
        console.log('in :')
        User
          .findByIdAndUpdate(
            { _id: user._id },
            { reset_password_token: token, reset_password_expires: Date.now() + 86400000 },
            { upsert: true, new: true })
          .exec((err, new_user) => {
            done(err, token, new_user);
          });
      },
      (token, user, done) => {
        let data = {
          to: user.email,
          from: email,
          template: 'forgot-password-email',
          subject: 'Reset your password',
          context: {
            url: 'http://localhost:3000/reset-password?token=' + token,
            name: user.firstName
          }
        };
        smtpTransport.sendMail(data, (err) => {
          if(!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], (err) => {
      console.log('err :', err);
      errors.token = 'token expired.'
      return res.status(422).json(errors);
    });
  });
  
  
  // @route   POST api/users/reset-password
  // @desc    Reset the user password
  // @access  Private
  router.post('/reset-password', (req, res) => {
    const { errors, isValid } = validateResetPasswordInput(req.body);
    if(!isValid) {
      console.log('errors :', errors);
      return res.status(400).json(errors);
    }
  
    const token = req.body.token;
    // res.json(token);
    if(token) {
    console.log("token ok")
      User
        .findOne({
          reset_password_token: req.body.token,
          reset_password_expires: { $gt: Date.now() }    
        })
        .exec((err, user) => {
          if(!err && user) {
            if(req.body.password === req.body.verifyPassword) {
              
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
  
                  if(err) throw err;
                  user.password = hash;
                  // user.password = bcrypt.hashSync(req.body.password, 10);
                  user.reset_password_token = undefined;
                  user.reset_password_expires = undefined;
                  
                  user
                    .save()
                    .then(user => {
                      doWeSendBackToken(req, res, user);
                    })
                    .catch(err => {
                      console.log('err :', err);
                      res.status(422).json(err)
                    })
                });
              });
            } else {
              errors.password = 'Les mots de passe ne correspondent pas.';
              return res.status(400).json(errors);
            }
          } else {
            errors.password = 'Password reset token is invalid or has expired.';
            return res.status(400).json(errors);
          }
        });
    } else {
      errors.password = 'No token founded.';
      return res.status(400).json(errors);
    }
  });

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id : req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        avatar: req.user.avatar,
        defaultAvatar: req.user.defaultAvatar
    })
})

/**************/
/* END ROUTES */
/**************/

// @functions send back token if match email & password
const doWeSendBackToken = (req, res, user) => {
    const errors = {};
    const password = req.body.password;
    
    if(!user) {
      errors.login = 'E-mail ou mot de passe invalide.';
      res.status(404).json(errors);
    }
  
    bcrypt.compare(password, user.password)
      .then(isMatch => {
  
        if(isMatch) {
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            defaultAvatar: user.defaultAvatar
          }
  
          // JSON Web Token process (default setup : 12 hours)
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 43200 }, (err, token) => {
            res.json({sucess: true, token: 'Bearer ' + token});
          });
  
        } else {
          errors.password = 'Mot de passe invalide.';
          res.status(404).json(errors);
        }
      });
  };


module.exports = router;
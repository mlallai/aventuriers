const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

// Load Post Model
const Message = require("../../models/Message");
// Load User Model
const User = require("../../models/User");

// Validation
const validateMessageInput = require("../../validation/message");

// Set nodemailer options
const email = require("../../config/keys").mailerEmailId;
const pass = require("../../config/keys").mailerPassword;

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || "Gmail",
  auth: {
    user: email,
    pass: pass
  }
});

const handlebarsOptions = {
  viewEngine: "handlebars",
  viewPath: path.resolve("./routes/templates"),
  extName: ".html"
};

smtpTransport.use("compile", hbs(handlebarsOptions));

// @route GET api/messages/test
// @desc Test messages route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "MESSAGES WORKS" }));

// @route GET api/messages
// @desc Get Messages of a user (both as a sender and as a recipient)
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.find({
      $or: [{ senderID: req.user.id }, { recipientID: req.user.id }]
    })
      .populate("senderID", [
        "firstName",
        "lastName",
        "email",
        "avatar",
        "defaultAvatar"
      ])
      .populate("recipientID", [
        "firstName",
        "lastName",
        "email",
        "avatar",
        "defaultAvatar"
      ])
      .sort({ date: -1 })
      .then(message => res.json(message))
      .catch(err => res.status(404).json({ nomessage: "No messages found" }));
  }
);

// @route GET api/messages/:id
// @desc Get Message by Id
// @access Private
router.get(
  "/message/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .populate("senderID", [
        "firstName",
        "lastName",
        "email",
        "avatar",
        "defaultAvatar"
      ])
      .populate("recipientID", [
        "firstName",
        "lastName",
        "email",
        "avatar",
        "defaultAvatar"
      ])
      .then(message => res.json(message))
      .catch(err =>
        res
          .status(404)
          .json({ nomessagefound: "No message found with that ID" })
      );
  }
);

// @route POST api/messages
// @desc Create Message
// @access Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const {errors, isValid} = validateMessageInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //     // If any errors, send 404 with error
    //     return res.status(400).json(errors);
    // }
    const newMessage = new Message({
      text: req.body.text,
      senderID: req.user.id,
      recipientID: req.params.id,
      user: req.user.id
    });
    newMessage.save().then(message => res.json(message));

    // Find Recipient to send him a mail notif
    User.findOne({
      _id: req.params.id
    }).then(user => {
      let data = {
        to: user.email,
        from: email,
        template: "message-email",
        subject: "Message reçu sur Aventuriers.co !",
        context: {
          url: "http://www.aventuriers.co/messages",
          name: user.firstName,
          message: req.body.text
        }
      };
      smtpTransport.sendMail(data, err => {
        if (!err) {
          return res.json({
            message: "Kindly check your email for further instructions"
          });
        }
        // else {
        //   return done(err);
        // }
      });
    });
  }
);

// @route POST api/messages/reply
// @desc Post a reply to a Message
// @access Private
router.post(
  "/reply/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid} = validateMessageInput(req.body);

    //     // Check validation
    //     if (!isValid) {
    //         // Return any errors with 400 status
    //         return res.status(400).json(errors);
    //     }

    // Find the conversation corresponding to the reply
    Message.findOne({ _id: req.params.id }).then(message => {
      let replyRecipientID;
      console.log("req.user.id", req.user.id);
      console.log("message.recipientID", message.recipientID);
      console.log("message.senderID", message.senderID);

      // if ((req.user.id = message.senderID)) {
      //   replyRecipientID = message.recipientID;
      // } else {
      //   replyRecipientID = message.senderID;
      // }

      if (req.user.id === message.senderID) {
        console.log("route1");
        replyRecipientID = message.recipientID;
      } else {
        console.log("route2");
        replyRecipientID = message.senderID;
      }

      console.log("replyRecipientID", replyRecipientID);

      // if (message.senderID === req.user.id) {
      //   replyRecipientID = message.recipientID;
      // } else {
      //   replyRecipientID = message.senderID;
      // }
      const newReply = {
        text: req.body.text,
        senderID: req.user.id,
        recipientID: replyRecipientID
      };

      console.log("newReply", newReply);

      // Add to new Reply to the replies Array
      message.replies.unshift(newReply);
      message.save().then(message => res.json(message));

      // Sending notification to the recipient
      User.findOne({
        _id: replyRecipientID
      }).then(user => {
        let data = {
          to: user.email,
          from: email,
          template: "message-email",
          subject: "Message reçu sur Aventuriers.co !",
          context: {
            url: "http://www.aventuriers.co/messages",
            name: user.firstName,
            message: req.body.text
          }
        };
        smtpTransport.sendMail(data, err => {
          if (!err) {
            return res.json({
              message: "Kindly check your email for further instructions"
            });
          }
          // else {
          //   return done(err);
          // }
        });
      });
    });
  }
);

module.exports = router;

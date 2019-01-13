const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const passport = require('passport');
const path = require('path');
// const multer = require('multer');
// const cloudinaryStorage = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary");

// cloudinary.config({
//     cloud_name: "adventurer",
//     api_key: '834569565449654',
//     api_secret: 'n2y6t-uMogfMbQ9PD26onY1LwGk'
//   });

// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "website",
//     allowedFormats: ["jpg", "png", "jpeg"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
//     });

// const parser = multer({ storage: storage });

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const adventures = require('./routes/api/adventures');
const messages = require('./routes/api/messages');


const app = express();

   
//   var parser = multer({ storage: storage });

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

//Connect to MongDB with Mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected !'))
    .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

//USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/adventures', adventures);
app.use('/api/messages', messages);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
   }

const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server running on port ${port}`));
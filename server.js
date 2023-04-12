// Dependencies
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")

const path = require('path')


// Initailze Express
const app = express();

app.use(cors())



// Require and initialze dotenv
require('dotenv').config();

// PORT Configuration
const port = process.env.PORT;

// Look for all the static files in public folder (css, JS, Images, Audio, Videos).
const buildPath = path.join(__dirname, 'build')
app.use(express.static(buildPath))
app.use(express.json())

// Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');

// Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 36000000}
}));

app.use(passport.initialize());
app.use(passport.session());

// Sharing the information with all web pages.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

mongoose.set('strictQuery', false);
// MongoDB Connection
try {
    // console.log(process.env.mongoDBURL)
    mongoose.connect(process.env.mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("MongoDB Connected Successfully");
} catch (error) {
    console.log("MongoDB Connection Error: ", error);
}



// Import Routes
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/image');


// Mount Routes
app.use('/', authRoute);
app.use('/', imageRoute);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });



// Listen to specific port for incomming requests
app.listen(port, () => {
    console.log(`Blog App is running on ${port}`);
})

app.get("/", (req, res) => {
    res.render("home/another");
})


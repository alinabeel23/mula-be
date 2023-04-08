// Dependencies
const express = require("express")
const mongoose = require("mongoose")


// Initailze Express
const app = express();


// Require and initialze dotenv
require('dotenv').config();

// PORT Configuration
const port = process.env.PORT;

// Look for all the static files in public folder (css, JS, Images, Audio, Videos).
app.use(express.static("public"));


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
    mongoose.connect(process.env.mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("MongoDB Connected Successfully");
} catch (error) {
    console.log("MongoDB Connection Error: ", error);
}

// Import Routes
const authRoute = require('./routes/auth');

// Mount Routes
app.use('/', authRoute);

// Listen to specific port for incomming requests
app.listen(port, () => {
    console.log(`Blog App is running on ${port}`);
})

app.get("/", (req, res) => {
    res.render("home/another");
})


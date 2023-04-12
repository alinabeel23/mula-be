// Require User Model
const User = require("../models/User");

// Require jsonwebtoken
const jwt = require("jsonwebtoken");

// Require bcrypt
const bcrypt = require("bcrypt");
const { application } = require("express");
const salt = 10;

// Require Passport Configurations
// let passport = require("../helper/ppConfig");

// API's for registration and Authentication

// HTTP GET - Signup Route -To load the signup form
exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};

// HTTP POST - Signup Route - To post the data
exports.auth_signup_post = (req, res) => {
  let user = new User(req.body);

  console.log(req.body)

  let hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);

  user.password = hash;

  // Save user
  user
    .save()
    .then(() => {
      // res.redirect("/auth/signin");
      res.json({ message: "User Created Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send("Please try again later.");
    });
};

// HTTP GET - Signin Route - To load the signin form
exports.auth_signin_get = (req, res) => {
  res.render("auth/signin");
};

// HTTP POST - Signin Route - To post the data
// exports.auth_signin_post = passport.authenticate('local', {
//     successRedirect: "/",
//     failureRedirect: "/auth/signin",
// });

// JWT Authentication
exports.auth_signin_post = async (req, res) => {
  let { emailAddress, password } = req.body;

  console.log(emailAddress);

  try {
    let user = await User.findOne({ emailAddress });
    console.log(user);

    if (!user) {
      return res.json({ message: "User Not Found" });
    }

    // Compare Password
    const isMatch = await bcrypt.compareSync(password, user.password);
    console.log(password);
    console.log(user.password);

    if (!isMatch) {
      return res.json({ message: "Password doesnot matched" });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNum: user.phoneNum,
        email: user.emailAddress
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }).status(200);
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "Your are not loggedIn !!!" }).status(400);
  }
};

// HTTP GET - Logout Route - To logout the user
exports.auth_logout_get = (req, res) => {
  // Invalidate the session
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/signin");
  });
};


  exports.user_delete_get = (req, res) => {
    console.log(req.query.id);
    User.findByIdAndDelete(req.query.id)
    .then((user)=>{
        res.json({user})
    })
    .catch(err => {
        console.log(err);
    })
  }


// forgot password
// exports.authCntrl.auth_forgot_pw = async (req, res) => {
//   const {emailAddress} = req.body
//   try {
//     let user = await User.findOne({ emailAddress });
//     console.log(user);
//     if (!user) {
//       return res.json({ message: "User Not Found" });
//     }
//     const secret = JWT_TOKEN = user.password
//     const token = jwt.sign({email: user.emailAddress, id: user._id }, secret,)
//     const link = `http://localhost:4000/reset-password/${user._id}/${token}`
//     console.log(link);
//   } catch (error) {
//   }
// }

// exports.authCntrl.auth_reset_password = async (req, res) => {
//   const {id, token} = req.params
// }
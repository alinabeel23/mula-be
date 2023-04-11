const router = require('express').Router();
const express = require('express');

router.use(express.json())

// Controller
const authCntrl = require("../controllers/auth");

// Routes
router.get("/auth/signup", authCntrl.auth_signup_get);
router.post("/auth/signup", authCntrl.auth_signup_post);

router.get('/auth/signin', authCntrl.auth_signin_get);
router.post('/auth/signin', authCntrl.auth_signin_post);

router.get("/auth/logout", authCntrl.auth_logout_get);

// router.post("/auth/forgotpassword", authCntrl.auth_forgot_pw)
// router.get("/reset-password", authCntrl.auth_reset_password)

// Exports
module.exports = router;


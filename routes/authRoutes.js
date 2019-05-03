const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read"
      ]
    })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/error",
      successRedirect: "/auth/login"
    })
  );

  module.exports = router;
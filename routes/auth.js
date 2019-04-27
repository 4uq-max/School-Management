const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const mailer = require("../helpers/mailer");

router.get("/login", (req, res) => {
  res.render("auth-form", { action: "Login" });
});

router.get("/register", (req, res) => {
  res.render("auth-form");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
    failWithError: true
  })
);

router.post("/register", (req, res) => {
  const { password } = req.body;
  User.register(req.body, password)
    .then(user => {
      const { email } = user;
      const options = {
        email,
        subject: "Welcome to the School Management",
        message:
          "Welcome, please confirm your mail link: http://localhost:3000/login",
        /*file: "verify"*/
      };
      //mailer.generateHTML(options);
      options.filename ="verify";
      mailer.send(options);
      res.redirect("/login");
    })
    .catch(err => {
      res.render("auth-form", { err, action: "Register" });
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const mailer = require("../helpers/mailer");
const crypto = require("crypto");

router.get("/login", (req, res) => {
  res.render("auth-form", { action: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
    failWithError: true
  })
);

router.get("/register", (req, res) => {
  res.render("auth-form");
});

router.post("/register", (req, res) => {
  const { password } = req.body;

  User.register(req.body, password)
    .then(user => {
      const { email } = user;
      const options = {
        filename: "verify",
        email,
        subject: "Welcome to the School Management",
        message:
          "Welcome, please confirm your mail link: https://ih-school-management.herokuapp.com/login"
      };

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

router.get("/mail/reset-pass", (req, res) => {
  res.render("reset/reset-email");
});

router.post("/mail/reset-pass", (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.render("reset/reset-email", { err: "Email required" });
  const hash = crypto.randomBytes(20).toString("hex");
  User.findOneAndUpdate({ email }, { $set: { hash } }, { new: true }).then(
    user => {
      let options = {
        email: user.email,
        message:
          "We received a request to recover the password of your account, if it was not you, ignore this email",
        subject: "Reset password",
        link: `${req.headers.origin}/auth/mail/reset-pass/${user.hash}`
      };
      options.filename = "reset-pass";
      mailer
        .send(options)
        .then(() => {
          res.render("reset/reset-view");
        })
        .catch(err => {
          res.redirect("/");
        });
    }
  );
});

router.get("/mail/reset-pass/:token", (req, res) => {
  res.render("reset/reset-form");
});

router.post("/mail/reset-pass/:token", (req, res) => {
  const { token: hash } = req.params;
  const { password } = req.body;

  if (password !== req.body["confirm-password"])
    return res.render("reset/reset-form", { err: "Passwords don't match" });

  User.findOne({ hash }).then(user => {
    user.setPassword(password).then(user => {
      user.hash = undefined;
      user.save().then(() => {
        res.redirect("/auth/login");
      });
    });
  });
});

module.exports = router;

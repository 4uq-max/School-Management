const express = require("express");
const router = express.Router();
const User = require("../models/User");
//const uploader = require("../helpers/multer");
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  let canCreateUser;
  User.find()
    .then(users => {
      users = users.map(usr => {
        return String(user.role) === String('MANAGER')
          ? { ...usr._doc, canUpdate: true}
          : usr;
      });
      if (String(user.role) === String('MANAGER')) {
        canCreateUser = true;
      } else {
        canCreateUser = false;
      }
      res.render("manager", { user, users, canCreateUser });
    });
});

router.get("/newUser", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  res.render("user-form", { user });
});

router.post("/newUser", (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/manager");
    });
});

router.get('/:id/edit', (req, res) => {
  let { id } = req.params;
  User.findById(id)
  .then(user => {
    res.render('user-form', user);
  });
});

router.post('/:id/edit', (req, res) => {
  let { id } = req.params;
  User.findByIdAndUpdate(id, {$set: {...req.body}})
  .then(() => {
    res.redirect('/manager');
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/:id/delete', (req, res) => {
  let { id } = req.params;
  User.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/manager');
  });
});

module.exports = router;
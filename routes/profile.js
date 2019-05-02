const express = require("express");
const router = express.Router();
const User = require("../models/User");
const upload = require("../helpers/multer.js");
const uploadProfilePicture = upload.uploadProfilePicture;
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("STUDENT"), (req, res) => {
  const { user } = req;
  res.render("profile", { user });
});

/*router.post(
  "/:id/edit",
  helpers.isAuth,
  uploader.single("image"),
  (req, res) => {
    const { id: _id } = req.params;
    const { email } = req.user;
    const { url: image } = req.file;
    const user = { ...req.body, image };
    User.findOneAndUpdate({ _id, email }, { $set: user })
      .then(() => {
        res.redirect("/profile");
      })
      .catch(err => {
        res.render("profile-form", { err });
      });
  }
);*/

module.exports = router;

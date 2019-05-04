const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Materia = require("../models/Materia");
const upload = require("../helpers/multer.js");
const uploadProfilePicture = upload.uploadProfilePicture;
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("STUDENT"), (req, res) => {
  const { user } = req;
  Group.find({ tag: "PRIMERO" })
    .populate("materia")
    .then(group => {
      let materias = group[0].materia;
      res.render("profile", { user, group, materias });
    });
});

router.post(
  "/:id/edit",
  helpers.isAuth,
  uploadProfilePicture.single("postPic"),
  (req, res) => {
    const { id: _id } = req.params;
    const image = req.file ? req.file.url : undefined;
    const user = image ? { ...req.body, image } : req.body;
    User.findOneAndUpdate({ _id }, { $set: user })
      .then(() => {
        res.redirect("/profile");
      })
      .catch(err => {
        res.render("profile", { err });
      });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Materia = require("../models/Materia");
const helpers = require("../helpers/function");
const upload = require("../helpers/multer.js");
const uploadProfilePicture = upload.uploadProfilePicture;

router.get("/", helpers.isAuth, helpers.checkRoles("TEACHER"), (req, res) => {
  const { user } = req;
  Group.find()
    .populate({ path: "materia", populate: { path: "teacher" } })
    .then(groups => {
      let mats = [];
      let materias = [];
      groups = groups.map(grupo => {
        mats = grupo.materia;
        mats = mats.map(materia => {
          if (String(materia.teacher._id) === String(user._id)) {
            materias.push(materia);
          }
        });
      });
      User.getByGroupTag("PRIMERO").then(usrs => {
        let alumni1 = [];
        usrs = usrs.map(usr => {
          alumni1.push(usr);
          return String(user.role) === String("TEACHER")
            ? { ...usr._doc, canUpdate: true }
            : usr;
        });
        User.getByGroupTag("SEGUNDO").then(usrs => {
          let alumni2 = [];
          usrs = usrs.map(usr => {
            alumni2.push(usr);
            return String(user.role) === String("TEACHER")
              ? { ...usr._doc, canUpdate: true }
              : usr;
          });
          res.render("teacher", { user, alumni1, alumni2, materias });
        });
      });
    });
});

router.post(
  "/:id/edit",
  helpers.isAuth,
  helpers.checkRoles("TEACHER"),
  uploadProfilePicture.single("postPic"),
  (req, res) => {
    const { id: _id } = req.params;
    const image = req.file ? req.file.url : undefined;
    const user = image ? { ...req.body, image } : req.body;
    User.findOneAndUpdate({ _id }, { $set: user })
      .then(() => {
        res.redirect("/teacher");
      })
      .catch(err => {
        res.render("main", { err });
      });
  }
);

router.post(
  "/comment",
  helpers.isAuth,
  helpers.checkRoles("TEACHER"),
  (req, res) => {
    const { id, comment } = req.body;
    User.findByIdAndUpdate(id, { $push: { comment: comment } })
      .then(() => {
        res.redirect("/teacher");
      })
      .catch(err => {
        res.redirect("/main");
        console.log(err);
      });
  }
);

module.exports = router;

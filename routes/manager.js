const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Materia = require("../models/Materia");
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  let canCreateUser;
  Group.find().then(groups => {
    manager = true;
    canCreateUser = true;
    res.render("manager", { user, groups, canCreateUser });
  });
});

router.get(
  "/:tag",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    let canCreateUser;
    const tag = req.params.tag;
    const { user } = req;
    Group.find({ tag: tag })
      .populate({ path: "materia", populate: { path: "teacher" } })
      .then(group => {
        canCreateUser = true;
        manager: true;
        let materias = group[0].materia;
        User.getByGroupTag(tag).then(usrs => {
          let alumni = [];
          usrs = usrs.map(usr => {
            alumni.push(usr);
            return String(user.role) === String("MANAGER")
              ? { ...usr._doc, canUpdate: true }
              : usr;
          });
          res.render("group", {
            user,
            alumni,
            materias,
            tag,
            canCreateUser
          });
        });
      });
  }
);

router.post(
  "/newUser",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    const { password } = req.body;
    User.register(req.body, password).then(user => {
      res.redirect("/manager");
    });
  }
);

router.post(
  "/newGroup",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    Group.create(req.body).then(() => {
      res.redirect("/manager");
    });
  }
);

module.exports = router;

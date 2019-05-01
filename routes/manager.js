const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Materia = require("../models/Materia");
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  let manager;
  let canCreateUser;
  Group.find().then(groups => {
    manager = true;
    canCreateUser = true;
    res.render("manager", { user, groups, manager, canCreateUser });
  });
});

router.get(
  "/:tag",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    const tag = req.params.tag;
    const { user } = req;
    Group.find({ tag: tag })
      .populate({ path: "materia", populate: { path: "teacher" } })
      .then(group => {
        let materias = group[0].materia;
        User.getByGroupTag(tag).then(usrs => {
          let alumni = [];
          usrs = usrs.map(usr => {
            alumni.push(usr);
            return String(user.role) === String("MANAGER")
              ? { ...usr._doc, canUpdate: true }
              : usr;
          });
          res.render("group", { user, alumni, materias, tag });
        });
      });
  }
);

router.post(
  "/newUser",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    User.create(req.body).then(() => {
      res.redirect("/manager");
    });
  }
);

router.get("/:id/editU", (req, res) => {
  let { id } = req.params;
  User.findById(id).then(user => {
    res.render("user-form", user);
  });
});

router.post("/:id/editU", (req, res) => {
  let { id } = req.params;
  User.findByIdAndUpdate(id, { $set: { ...req.body } }).then(() => {
    res.redirect("/manager");
  });
});

router.get("/:id/deleteU", (req, res) => {
  let { id } = req.params;
  User.findByIdAndDelete(id).then(() => {
    res.redirect("/manager");
  });
});

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

router.get("/:id/editG", (req, res) => {
  let { id } = req.params;
  Group.findById(id).then(user => {
    res.render("group-form", user);
  });
});

router.post("/:id/editG", (req, res) => {
  let { id } = req.params;
  Group.findByIdAndUpdate(id, { $set: { ...req.body } }).then(() => {
    res.redirect("/manager");
  });
});

router.get("/:id/deleteG", (req, res) => {
  let { id } = req.params;
  Group.findByIdAndDelete(id).then(() => {
    res.redirect("/manager");
  });
});

module.exports = router;

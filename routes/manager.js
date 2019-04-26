const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  let canCreateUser;
  Group.find().then(groups => {
    groups = groups.map(group => {
      return String(user.role) === String("MANAGER")
        ? { ...group._doc, canUpdate: true }
        : group;
    });
    if (String(user.role) === String("MANAGER")) {
      canCreateUser = true;
    } else {
      canCreateUser = false;
    }
    res.render("manager", { user, groups, canCreateUser });
  });
});

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

router.get("/:id/edit", (req, res) => {
  let { id } = req.params;
  User.findById(id).then(user => {
    res.render("user-form", user);
  });
});

router.post("/:id/edit", (req, res) => {
  let { id } = req.params;
  User.findByIdAndUpdate(id, { $set: { ...req.body } })
    .then(() => {
      res.redirect("/manager");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id/delete", (req, res) => {
  let { id } = req.params;
  User.findByIdAndDelete(id).then(() => {
    res.redirect("/manager");
  });
});

router.get(
  "/newGroup",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  (req, res) => {
    const { user } = req;
    res.render("group-form", { user });
  }
);

router.post("/newGroup", (req, res) => {
  Group.create(req.body).then(() => {
    res.redirect("/manager");
  });
});

router.get("/:id/editG", (req, res) => {
  let { id } = req.params;
  Group.findById(id).then(user => {
    res.render("group-form", user);
  });
});

router.post("/:id/editG", (req, res) => {
  let { id } = req.params;
  Group.findByIdAndUpdate(id, { $set: { ...req.body } })
    .then(() => {
      res.redirect("/manager");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id/deleteG", (req, res) => {
  let { id } = req.params;
  Group.findByIdAndDelete(id).then(() => {
    res.redirect("/manager");
  });
});

module.exports = router;

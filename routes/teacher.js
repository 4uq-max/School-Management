const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Group = require("../models/Group");
const Materia = require("../models/Materia");
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, helpers.checkRoles("TEACHER"), (req, res) => {
  const { user } = req;
  const manager = true;
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
          res.render("teacher", { user, alumni1, alumni2, materias, manager });
        });
      });
    });
});

/*router.get("/", helpers.isAuth, (req, res) => {
  const { user } = req;
  Materia.find({ teacher: user._id }).then(materias => {
    /*User.getByGroupTag(tag).then(usrs => {
      let alumni = [];
      usrs = usrs.map(usr => {
        alumni.push(usr);
        return String(user.role) === String("MANAGER")
          ? { ...usr._doc, canUpdate: true }
          : usr;
      });
    });
    Group.find()
      .populate("materia")
      .then(groups => {
        console.log(groups);
        res.render("teacher", { user, groups, materias });
      });
  });
});*/

/*router.get("/newUser", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
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
});*/

module.exports = router;

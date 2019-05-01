const express = require("express");
const router = express.Router();
const helpers = require("../helpers/function");
const upload = require("../helpers/multer.js");
const uploadPostPicture = upload.uploadPostPicture;
const Article = require("../models/Article");
const User = require("../models/User");

router.get("/", helpers.isAuth, (req, res) => {
  const { user } = req;
  let canRate;
  let manager;
  if (String(user.role) === String("MANAGER")) {
    canCreateArticle = true;
    manager = true;
  } else {
    canCreateArticle = false;
  }
  if (String(user.role) === String("TEACHER")) {
    canRate = true;
    manager = true;
  } else {
    canRate = false;
  }
  Article.find().then(articles => {
    let idis = [];
    articles = articles.map(article => {
      idis.push(article._id);
      return String(user.role) === String("MANAGER")
        ? { ...article._doc, canUpdate: true }
        : article;
    });
    res.render("main", {
      user,
      articles,
      canCreateArticle,
      canRate,
      idis,
      manager
    });
  });
});

router.post(
  "/newNotice",
  helpers.isAuth,
  helpers.checkRoles("MANAGER"),
  uploadPostPicture.single("postPic"),
  (req, res) => {
    const titlee = req.body.titlee;
    const picPath = req.file.url;
    const description = req.body.description;
    const picName = req.file.originalname;

    Article.create({ titlee, picPath, description, picName }).then(() => {
      res.redirect("/main");
    });
  }
);

router.post("/:id/edit", (req, res) => {
  const { id: _id } = req.params;
  console.log(id);
  const titlee = req.body.titlee;
  const picPath = req.file.url;
  const description = req.body.description;
  const picName = req.file.originalname;
  const modal = { titlee, picPath, description, picName };

  Article.findOneAndUpdate(
    _id,
    {
      titlee,
      picPath,
      description,
      picName
    },
    { $set: modal }
  ).then(() => {
    res.redirect("/main");
  });
});

router.get("/:id/delete", (req, res) => {
  let { id } = req.params;
  Article.findByIdAndDelete(id).then(() => {
    res.redirect("/main");
  });
});

module.exports = router;

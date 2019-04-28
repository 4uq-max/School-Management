const express = require("express");
const router = express.Router();
const helpers = require("../helpers/function");
const upload = require("../helpers/multer.js");
const uploadPostPicture = upload.uploadPostPicture;
const Article = require("../models/Article");
const User = require("../models/User");

router.get("/", helpers.isAuth, (req, res) => {
  const { user } = req;
  let canCreateArticle;
  let canRate;
  Article.find().then(articles => {
    articles = articles.map(article => {
      return String(user.role) === String("MANAGER")
        ? { ...article._doc, canUpdate: true }
        : article;
    });
    if (String(user.role) === String("MANAGER")) {
      canCreateArticle = true;
    } else {
      canCreateArticle = false;
    }
    if (String(user.role) === String("TEACHER")) {
      canRate = true;
    } else {
      canRate = false;
    }
    res.render("main", { user, articles, canCreateArticle, canRate });
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
  const { id } = req.params;
  const { ...article } = req.body;
  Article.findByIdAndUpdate(id, { $set: { ...article } }).then(() => {
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

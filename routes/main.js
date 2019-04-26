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
  Article.find()
    .then(articles => {
      articles = articles.map(article => {
        return String(user.role) === String('MANAGER')
          ? { ...article._doc, canUpdate: true}
          : article;
      });
      if (String(user.role) === String('MANAGER')) {
        canCreateArticle = true;
      } else {
        canCreateArticle = false;
      }
      if (String(user.role) === String('TEACHER')) {
        canRate = true;
      } else {
        canRate = false;
      }
      res.render("main", { user, articles, canCreateArticle, canRate });
    });
});

router.get("/newNotice", helpers.isAuth, helpers.checkRoles("MANAGER"), (req, res) => {
  const { user } = req;
  res.render("article-form", { user });
});

router.post("/newNotice", uploadPostPicture.single("postPic"), (req, res) => {
  const title = req.body.title
  const picPath = req.file.url;
  const description = req.body.description;
  const picName = req.file.originalname;

  Article.create({ title, picPath, description, picName }).then(() => {
    res.redirect("/main");
  });
});


router.get('/:id/edit', (req, res) => {
  let { id } = req.params;
  Article.findById(id)
  .then(article => {
    res.render('article-form', article);
  });
});

router.post("/:id/edit", /*uploader.array("images")*/ (req, res) => {
  const { id } = req.params;
  const { ...article } = req.body;
  Article.findByIdAndUpdate(id, { $set: { ...article } }).then(
    () => {
      res.redirect("/main");
    }
  );
});

router.get('/:id/delete', (req, res) => {
  let { id } = req.params;
  Article.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/main');
  });
});

module.exports = router;

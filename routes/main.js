const express = require("express");
const router = express.Router();
const helpers = require("../helpers/function");
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

router.post("/newNotice", (req, res) => {
  Article.create(req.body)
    .then(() => {
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

router.post('/:id/edit', (req, res) => {
  let { id } = req.params;
  Article.findByIdAndUpdate(id, {$set: {...req.body}})
  .then(() => {
    res.redirect('/main');
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/:id/delete', (req, res) => {
  let { id } = req.params;
  Article.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/main');
  });
});

module.exports = router;

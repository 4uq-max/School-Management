const express = require("express");
const router = express.Router();
const helpers = require("../helpers/function");

router.get("/", helpers.isAuth, (req, res) => {
  const { user } = req;
  res.render("private", { user });
});

module.exports = router;

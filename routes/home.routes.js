const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  let isConnected = false;
  if (req.session.Professional || req.session.Client) {
    isConnected = true;
  }
  res.render("home", { isConnected });
});

module.exports = router;

//confirm the if if its ok//

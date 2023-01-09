const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', { root: __dirname });
  console.log(req.params);
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
  //res.send("<h1>wow</h1>");
});

router.get("/test(.html)?", (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

module.exports = router;

const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', { root: __dirname });
  console.log(req.params);
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  //res.send("<h1>wow</h1>");
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});

module.exports = router;

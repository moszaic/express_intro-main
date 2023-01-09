const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler"); //logger required braces bc it's one of 2 functions in the jsfile
const PORT = process.env.PORT || 3500;

//custon middleware logger
app.use(logger);

//3rd party middleware
//Cross Origin Resource Sharing
/* const whitelist = ["https://www.google.com", "http://127.0.0.1:3500"];
const corsOptions = {
  //origin in parms coming from whoever requested it
  origin: (origin, callback) => {
    // || !origin is necessary during development to prevent CORS error at localhost3500, something to do with reqLog.txt showing an "undefined"
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      //if domain is in the whitelist
      callback(null, true);
      //null means no err
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSucessStatus: 200,
}; */
app.use(cors(corsOptions));

//built in middleware to handle urlencoded aka form data
//content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//servce static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

//old index get
/* app.get("^/$|/index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', { root: __dirname });
  console.log(req.params);
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //res.send("<h1>wow</h1>");
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
}); */

// Route handlers
/* app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
}; 

app.get("/chain(.html)?", [one, two, three]);*/

//app.use('/')
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

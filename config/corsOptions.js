const whitelist = [
  "https://www.google.com",
  "http://127.0.0.1:3500",
  "http://localhost:3000",
];
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
};

module.exports = corsOptions;

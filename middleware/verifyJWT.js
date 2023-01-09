const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); //unauthorized
  console.log(authHeader); // Bearer {token}
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //403 = forbidden. maybe tampered, invalid token
    req.user = decoded.username;
    next();
  });
};
//I didn't know req could be mutated. Maybe is special middleware property.

//so this is in response to the original creation of the jwt token via jwt.sign() in authController.js, which took the founduser.username as payload and assigned as username, the sole property in the obj. only other arguments were the SECRET_KEY from .env and expiresIn.
//jwt.verify() here is placed only after /employees route. there's no code for this, we do it manually to copy the token from auth to fulfill this middleware as part of the employees GET request, body is the employee obj to search for.

//i think req.user is actually being created here as a new property of req. as of 37:00 through jwt video it hasn't actually been used anywhere else yet.

module.exports = verifyJWT;

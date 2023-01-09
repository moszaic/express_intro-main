const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  //.json({ message: "cookie no jwt property" });
  console.log("cookies.jwt:" + cookies.jwt);
  const refreshToken = cookies.jwt;
  //check if the username exists
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403); //Forbidden

  //evaluate jwt
  //no longer need to 1.create RT or AT, 2. update DB (employees.json) with User obj containing the RT, 3. res.cookie the RT 4. res.json the AT. Actually I guess 4. still needs to be done, idg why though. Oh it's sending a new AT after verifying the RT, instead of going through the original auth process
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

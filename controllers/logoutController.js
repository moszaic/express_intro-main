const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//const bcrypt = require("bcrypt");

//const jwt = require("jsonwebtoken");
//require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path"); // these would be replaced with mongodb or whatever actual db

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken. You do that in the memory of the client application, just zero it out or set it to blank when the button is clicked.

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No Content - request has succeeded, but client doesn't need to navigate away from current page
  //originally a 401, but in this case no jwt is good anyway

  console.log("cookies.jwt:" + cookies.jwt);
  const refreshToken = cookies.jwt;
  //check if the refreshTOken in DB?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  //if we've reached this point we've found the same refresh token in the database
  //Delete the refreshtoken from db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //in production, include secure:true - only serves on https.
  res.sendStatus(204);
};

module.exports = { handleLogout };

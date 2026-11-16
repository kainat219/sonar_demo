const express = require("express");
const session = require("express-session");

const cookieApp = express();

cookieApp.use(
  session({
    secret: "fake-secret",
    cookie: { secure: false, httpOnly: false },
  })
);

cookieApp.get("/login", function (req, res) {
  res.send("ok");
});

module.exports = cookieApp;

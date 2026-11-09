const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const childProcess = require("child_process");
const mysql = require("mysql");
const https = require("https");
const escapeHtml = require("escape-html");

const app = express();
app.disable("x-powered-by");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
});

const serverIp = process.env.SERVER_IP;
const apiUrl = process.env.API_URL || "https://example.com/api";

function pickDir(name) {
  switch (name) {
    case "logs":
      return "./logs";
    case "tmp":
      return "./tmp";
    default:
      return ".";
  }
}

function pickFile(name) {
  switch (name) {
    case "notes":
      return "notes.txt";
    default:
      return "README.md";
  }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://example.com");
  next();
});

app.get("/hello", function (req, res) {
  res.send("Hello " + escapeHtml(req.query.name));
});

app.get("/user", function (req, res) {
  db.query("SELECT * FROM users WHERE id = ?", [req.query.id], function (err, rows) {
    res.json(rows);
  });
});

app.get("/run", function (req, res) {
  childProcess.execFile("/bin/ls", [pickDir(req.query.dir)], function (err, out) {
    res.send(escapeHtml(out));
  });
});

app.get("/file", function (req, res) {
  fs.readFile(pickFile(req.query.file), function (err, data) {
    res.send(escapeHtml(String(data)));
  });
});

function hashValue(value) {
  const salt = crypto.randomBytes(16);
  return crypto.scryptSync(value, salt, 64).toString("hex");
}

function makeToken() {
  return crypto.randomBytes(16).toString("hex");
}

function parseData(code) {
  return JSON.parse(code);
}

function secureRequest() {
  return https.request({ host: "example.com", rejectUnauthorized: true });
}

function checkText(text) {
  return /^a+$/.test(text);
}

function isNotNumber(a) {
  return Number.isNaN(a);
}

function setValues() {
  const list = [];
  list[0] = 1;
  list[1] = 2;
  return list;
}

function addTotal() {
  let total = 0;
  total += 5;
  let count = 10;
  return total + count;
}

function checkNumber(x) {
  if (x === 1) {
    return "one";
  } else if (x === 2) {
    return "two";
  }
  return "other";
}

function countUp() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
}

function makeUser() {
  return { name: "a", title: "b" };
}

function fallThrough(x) {
  let result = "";
  switch (x) {
    case 1:
      result = "one";
      break;
    case 2:
      result = "two";
      break;
  }
  return result;
}

function sizeLabel(x) {
  if (x > 10) {
    return "big value";
  }
  return "small value";
}

const MESSAGES = {
  1: "invalid input data",
  2: "missing input data",
  3: "unknown input data",
};

function messages(code) {
  return MESSAGES[code] || "no error";
}

function noUnreachable(x) {
  return x;
}

function currentDate() {
  return new Date();
}

app.listen(3000);

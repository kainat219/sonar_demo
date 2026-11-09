const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const os = require("os");
const childProcess = require("child_process");
const mysql = require("mysql");
const https = require("https");

const app = express();
const db = mysql.createConnection({ host: "localhost", user: "root", password: "admin123" });

const password = "admin123";
const serverIp = "192.168.1.10";
const apiUrl = "http://example.com/api";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/hello", function (req, res) {
  res.send("Hello " + req.query.name);
});

app.get("/user", function (req, res) {
  db.query("SELECT * FROM users WHERE id = " + req.query.id, function (err, rows) {
    res.json(rows);
  });
});

app.get("/run", function (req, res) {
  childProcess.exec("ls " + req.query.dir, function (err, out) {
    res.send(out);
  });
});

app.get("/file", function (req, res) {
  fs.readFile(req.query.file, function (err, data) {
    res.send(data);
  });
});

function hashValue(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function makeToken() {
  return Math.random().toString(36);
}

function runCode(code) {
  return eval(code);
}

function insecureRequest() {
  return https.request({ host: "example.com", rejectUnauthorized: false });
}

function checkText(text) {
  return /(a+)+$/.test(text);
}

function compare(a) {
  if (a === a) {
    return 1;
  }
  return 0;
}

function overwrite() {
  const list = [];
  list[0] = 1;
  list[0] = 2;
  return list;
}

function badAssign() {
  let total = 0;
  total =+ 5;
  count = 10;
  return total;
}

function duplicateCondition(x) {
  if (x === 1) {
    return "one";
  } else if (x === 1) {
    return "uno";
  }
  return "other";
}

function wrongLoop() {
  for (let i = 0; i < 5; i--) {
    console.log(i);
  }
}

function indexCheck(text) {
  if (text.indexOf("a") > 0) {
    return true;
  }
  return false;
}

function duplicateKey() {
  return { name: "a", name: "b" };
}

function fallThrough(x) {
  let result = "";
  switch (x) {
    case 1:
      result = "one";
    case 2:
      result = "two";
      break;
  }
  return result;
}

function unusedThings(x, y, z) {
  var unused = 5;
  var other = 6;
  var temp = 1;
  temp = 2;
  return x;
}

function sameBranches(x) {
  if (x > 10) {
    return "big value";
  } else {
    return "big value";
  }
}

function messages(code) {
  if (code === 1) {
    return "invalid input data";
  }
  if (code === 2) {
    return "invalid input data";
  }
  if (code === 3) {
    return "invalid input data";
  }
  return "invalid input data";
}

function emptyBlock(x) {
  if (x) {
  }
  ;;
}

function Bad_Name() {
  var Bad_Var = 1;
  return Bad_Var;
}

function boolCheck(flag) {
  if (flag === true) {
    return 1;
  }
  if (flag === false) {
    return 2;
  }
  return 3;
}

function immediateReturn(a, b) {
  const result = a + b;
  return result;
}

function immediateReturnTwo(a, b) {
  const result = a * b;
  return result;
}

function unreachable(x) {
  return x;
  console.log("never runs");
}

function nestedTernary(a, b) {
  return a ? "a" : b ? "b" : "c";
}

function emptyFunction() {}

function redundantReturn() {
  console.log("hello");
  return;
}

function unusedObject() {
  new Date();
}

function sameBody1(a) {
  const x = a + 1;
  const y = x * 2;
  return y - 3;
}

function sameBody2(a) {
  const x = a + 1;
  const y = x * 2;
  return y - 3;
}

function oneCaseSwitch(x) {
  switch (x) {
    case 1:
      return "one";
  }
  return "";
}

function manyParams(a, b, c, d, e, f, g, h, i) {
  return a;
}

function complexLogic(a, b, c, d) {
  if (a > 0) {
    if (b > 0) {
      for (let i = 0; i < a; i++) {
        if (i % 2 === 0) {
          if (c > i) {
            while (d > 0) {
              if (d % 3 === 0) {
                d -= 2;
              } else {
                d -= 1;
              }
            }
          } else {
            if (b > i) {
              return i;
            }
          }
        }
      }
    }
  }
  return 0;
}

function anotherComplex(items, mode, flag) {
  let result = 0;
  for (const item of items) {
    if (mode === 1) {
      if (flag) {
        for (const part of item) {
          if (part > 0) {
            if (part % 2 === 0) {
              result += part;
            } else {
              result -= part;
            }
          }
        }
      } else {
        while (result < 100) {
          if (result % 5 === 0) {
            result += 3;
          } else {
            result += 1;
          }
        }
      }
    } else if (mode === 2) {
      if (flag && result > 10) {
        result *= 2;
      }
    }
  }
  return result;
}

// TODO: fix this later
// FIXME: this is broken
// const result = compute(5);
// console.log(result);

app.listen(3000);

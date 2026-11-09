import hashlib
import math
import os
import re
import secrets
import sqlite3
import subprocess

import requests
from flask import Flask, request
from flask_wtf.csrf import CSRFProtect
from markupsafe import escape

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "")
csrf = CSRFProtect(app)

api_host = os.environ.get("API_HOST", "")
api_url = os.environ.get("API_URL", "https://example.com/api")


def pick_host(name):
    if name == "local":
        return "localhost"
    if name == "example":
        return "example.com"
    return "localhost"


def pick_file(name):
    if name == "notes":
        return "notes.txt"
    return "README.md"


@app.route("/user")
def get_user():
    name = request.args.get("name", "")
    conn = sqlite3.connect("app.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE name = ?", (name,))
    rows = cur.fetchall()
    conn.close()
    return str(rows)


@app.route("/hello")
def hello():
    return f"<h1>{escape(request.args.get('q', ''))}</h1>"


@app.route("/ping")
def ping():
    host = pick_host(request.args.get("host"))
    subprocess.run(["/usr/bin/ping", "-c", "1", host], check=False)
    return "done"


@app.route("/file")
def read_file():
    path = pick_file(request.args.get("path"))
    with open(path) as handle:
        return handle.read()


def hash_password(value):
    salt = os.urandom(16)
    return hashlib.pbkdf2_hmac("sha256", value.encode(), salt, 600000).hex()


def make_token():
    return str(secrets.randbelow(900000) + 100000)


def fetch_data():
    return requests.get(api_url, verify=True)


def check_text(text):
    return re.match(r"a+$", text)


def compare(a, b):
    if a == b:
        return 1
    return 0


def total_price(items):
    total = 0
    for item in items:
        total += item
    return total


def fail():
    raise ValueError("something went wrong")


def float_check():
    return math.isclose(0.1 + 0.2, 0.3)


def replace_value():
    values = [0, 0]
    values[0] = 1
    values[1] = 2
    return values


def size_label(x):
    if x > 10:
        return "big value"
    return "small value"


def unreachable(x):
    return x


MESSAGES = {
    1: "invalid input data",
    2: "missing input data",
    3: "unknown input data",
}


def messages(code):
    return MESSAGES.get(code, "no error")


if __name__ == "__main__":
    app.run(debug=False)

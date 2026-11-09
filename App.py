import collections
import hashlib
import json
import os
import random
import re
import sqlite3
import sys

import requests
from flask import Flask, request

app = Flask(__name__)

password = "admin123"
api_host = "192.168.1.10"
api_url = "http://example.com/api"


@app.route("/user")
def get_user():
    name = request.args.get("name")
    conn = sqlite3.connect("app.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE name = '" + name + "'")
    return str(cur.fetchall())


@app.route("/hello")
def hello():
    return "<h1>" + request.args.get("q") + "</h1>"


@app.route("/ping")
def ping():
    os.system("ping " + request.args.get("host"))
    return "done"


@app.route("/file")
def read_file():
    path = request.args.get("path")
    with open(path) as handle:
        return handle.read()


def hash_password(value):
    return hashlib.md5(value.encode()).hexdigest()


def make_token():
    return str(random.randint(100000, 999999))


def fetch_data():
    return requests.get(api_url, verify=False)


def check_text(text):
    return re.match(r"(a+)+$", text)


def compare(a):
    if a == a:
        return 1
    return 0


def total_price(items):
    total = 0
    for item in items:
        total =+ item
    return total


def add_item(item, items=[]):
    items.append(item)
    return items


def read_config():
    try:
        value = int("abc")
    except:
        value = 0
    return value


def fail():
    raise "something went wrong"


def float_check():
    if 0.1 + 0.2 == 0.3:
        return True
    return False


def first_only(items):
    for item in items:
        return item


def replace_value():
    values = [0, 0]
    values[0] = 1
    values[0] = 2
    return values


def same_branches(x):
    if x > 10:
        return "big value"
    else:
        return "big value"


def unused_things(x, y, z):
    temp = 5
    other = 10
    third = 15
    return x


def Bad_Function_Name():
    Bad_Var = 1
    return 5


class bad_class_name:
    def Bad_Method(self):
        return 1


def unreachable(x):
    return x
    print("never runs")


def nested_ternary(a, b):
    return "a" if a else "b" if b else "c"


def merge_ifs(a, b):
    if a:
        if b:
            return 1
    return 0


def merge_ifs_two(a, b):
    if a > 5:
        if b > 5:
            return 2
    return 0


def empty_function():
    pass


def reraise():
    try:
        return int("5")
    except ValueError:
        raise


def redundant_return():
    print("hello")
    return


def messages(code):
    if code == 1:
        return "invalid input data"
    if code == 2:
        return "invalid input data"
    if code == 3:
        return "invalid input data"
    return "invalid input data"


def complex_logic(a, b, c, d):
    if a > 0:
        if b > 0:
            for i in range(a):
                if i % 2 == 0:
                    if c > i:
                        while d > 0:
                            if d % 3 == 0:
                                d -= 2
                            else:
                                d -= 1
                    else:
                        if b > i:
                            return i
    return 0


def another_complex(items, mode, flag):
    result = 0
    for item in items:
        if mode == 1:
            if flag:
                for part in item:
                    if part > 0:
                        if part % 2 == 0:
                            result += part
                        else:
                            result -= part
            else:
                while result < 100:
                    if result % 5 == 0:
                        result += 3
                    else:
                        result += 1
        elif mode == 2:
            if flag and result > 10:
                result *= 2
    return result


def many_params(a, b, c, d, e, f, g, h, i, j, k, l, m, n):
    return a


# TODO: fix this later
# FIXME: this is broken
# result = compute(5)
# print(result)


if __name__ == "__main__":
    app.run(debug=True)

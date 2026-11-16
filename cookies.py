from flask import Flask, make_response

cookie_app = Flask(__name__)
cookie_app.config["SESSION_COOKIE_SECURE"] = False
cookie_app.config["SESSION_COOKIE_HTTPONLY"] = False


@cookie_app.route("/login")
def login():
    resp = make_response("ok")
    resp.set_cookie("session_id", "abc123", secure=False, httponly=False)
    return resp

from flask import Flask, request, render_template, redirect, make_response
import json
import time
import requests
import os
from uuid import uuid4
app = Flask(__name__, static_url_path='')

@app.route("/")
def index():
  if f"ban-{request.cookies.get('client_id')}" in os.environ.keys():
    return render_template("banned.html", reason=os.environ[f"ban-{request.cookies.get('client_id')}"])
  else:
    return render_template("index.html")

@app.route("/log")
def log():
  resp = make_response("Logged!")
  if request.cookies.get('client_id') != None:
    client_id = request.cookies.get('client_id')
  else:
    client_id = str(uuid4())
    resp.set_cookie('client_id', client_id)
  if request.args.get("action") != None and request.args.get("data") != None:
    try:
      action = request.args.get("action")
      data = request.args.get("data")
    except:
      return("Not all arguements were met!")
  else:
    return("Not all arguements were met!")
  url = f"https://docs.google.com/forms/d/{os.environ['form_id']}/formResponse?entry.839749886={client_id}&entry.1090840047={action}&entry.652252929={data}"
  requests.get(url)
  return resp

app.run(host="0.0.0.0",port=80)
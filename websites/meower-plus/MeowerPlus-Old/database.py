from replit import db
from colored import fg, bg, attr
from datetime import datetime

def initKey(key, val):
  db[key] = val
  print("%s Set " + key + " to " + val + ". %s" % (fg(27), attr(0))

def getKey(key):
  return db[key]

def deleteKey(key):
  del db[key]
  print("%s Successfully deleted " + key + ". %s" % (fg(27), attr(0))

def listKeys():
  return db.keys()

def getTime():
  current_time = datetime.now()
  current_time = current_time.strftime("%H:%M:%S")


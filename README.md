# Cohort 8 Final Project #

## Team: Kevin, Theo, Fred, & Chaz ##


# mongoose with express

mongo db commands

⇒  mongo
MongoDB shell version: 3.2.1
connecting to: test

> use mongoose-demo
switched to db mongoose-demo

> show collections
politicians


> db.createCollection("politicians");
{ "ok" : 1 }


> db.politicians.find()


# import json into mongo

⇒  mongod

⇒  mongoimport --db mongoose-demo --collection politicians --drop --file politician-house-dataset.json

⇒  mongo
MongoDB shell version: 3.2.1
connecting to: test
> use mongoose-demo
switched to db mongoose-demo
> db.politicians.find()

# How to run project: #
## 1. 3 terminal windows open ##
    a. run 'gulp' in first window 
    b. run 'nodemon server.js' in second window 
    c. third window is for your git commands (git status, etc) 
## 2. Work in client/src/ directory ##
    - js/App.js never needs to change 
    - you can work in your files and see your changes as you go using gulp 
## 3. gulp will take files and deposit them into public directory as a single bundle (build.js)## 
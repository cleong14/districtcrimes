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
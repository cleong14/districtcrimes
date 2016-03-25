var express = require('express');
var crime = require('crime-dataset');

var app = express();

var db = require('./models');

app.get('/', function (req, res) {
  res.send('Working');
});

app.get('/crime', function (req, res) {
  console.log(db);
});

var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});
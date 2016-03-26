var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var path = require('path');


app.use(express.static(__dirname + '/public'));

//posting a new crime to our database
app.post('/api', function (req, res) {
  var data = req.body;
  console.log(data);
  var newCrimeData = {
    //some keys and values
  };
  db.crime.create(newCrimeData)
    .then(function (crime) {
      console.log(crime);
      return res.json(crime);
    });
});

//render main page
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/extortion.html'));
});


//finding all from our 'crime' database
app.get('/api', function (req, res) {
  db.crime.findAll()
    .then(function (crimes) {
      res.json(crimes);
    });
});


var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});
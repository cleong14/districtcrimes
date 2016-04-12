var express = require('express');
var crime = require('./crime-dataset');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var path = require('path');
var db = require('./models');
var sequelize = require('sequelize');

var app = express();

mongoose.connect('mongodb://localhost/mongoose-demo');

var poliSchema = mongoose.Schema({
	legislator_number: String,
	legislator_year: String,
	legislator_type: String,
	politician_officetype: String,
	politician_position: String,
	politician_party: String,
	politician_picture: String,
	politician_firstname: String,
	politician_lastname: String,
	address_street: String,
	address_room: String,
	contact_phone: String,
	contact_fax: String,
	contact_email: String,
	contact_links: String,
	district_name: String,
	district_area: [String],
	politician_committee: [String],
	politician_measures: [String]
});

// collection name will get pluralized by mongoose
var Politician = mongoose.model('Politician', poliSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//render main page
app.get('/', function (req, res) {
  res.render('index');
});

//finding all from our 'crime' database
app.get('/api', function (req, res) {
  db.crime.findAll()
    .then(function (crimes) {
      res.json(crimes);
    });
});


app.route('/barchart')
	.get(function (req, res) {
		db.crime.findAll({attributes:['type',
			[sequelize.fn('COUNT',sequelize.col('crime.type')),'count']
		],
		group:['type']})
		.then(function (crimes) {
			res.json(crimes);
		});
	});

app.get('/senatecrimequery', function (req, res) {

  db.crime.sequelize.query(
    'SELECT ' +
      '"type", "senateDistrict", COUNT("crime"."type") AS "count", ' +
      'to_timestamp(floor((extract("epoch" from date) / 604800 )) * 604800) ' +
      // 'AT TIME ZONE "UTC" as "interval_alias" ' +
    'FROM ' +
      '"crimes" AS "crime" ' +
    'GROUP BY ' +
      '"type", "senateDistrict", "to_timestamp" ' +
    'ORDER BY ' +
      'type'
  )
  .then(function (results) {
    res.json(results);
  });
});

app.get('/senatecrimequerytest', function (req, res) {

  db.crime.sequelize.query(
    'SELECT ' +
      '"type", "senateDistrict", COUNT("crime"."type") AS "count", ' +
      'to_timestamp(floor((extract("epoch" from date) / 604800 )) * 604800) ' +
      // 'AT TIME ZONE "UTC" as "interval_alias" ' +
    'FROM ' +
      '"crimes" AS "crime" ' +
    'GROUP BY ' +
      '"type", "senateDistrict", "to_timestamp" ' +
    'ORDER BY ' +
      'to_timestamp'
  )
  .then(function (results) {
    res.json(results);
  });
});

app.get('/housecrimequery', function (req, res) {

  db.crime.sequelize.query(
    'SELECT ' +
      '"type", "houseDistrict", COUNT("crime"."type") AS "count", ' +
      'to_timestamp(floor((extract("epoch" from date) / 604800 )) * 604800) ' +
      // 'AT TIME ZONE "UTC" as "interval_alias" ' +
    'FROM ' +
      '"crimes" AS "crime" ' +
    'GROUP BY ' +
      '"type", "houseDistrict", "to_timestamp" ' +
    'ORDER BY ' +
      'type'
  )
  .then(function (results) {
    res.json(results);
  });
});

app.route('/politicians')
	.get(function (req, res) {
		Politician.find({}, function(err,politicians) {
			if (err) {
				throw err;
			}
			res.json(politicians);
		});
	})
	.post(function (req, res) {
		var newPolitician = new Politician(req.body);
		newPolitician.save();
		res.send('saved');
	});

app.route('/politicians/:id')
	.get(function (req, res) {
		var politicianId = req.params.id;
		Policitian.findById(politicianId, function(err,politician) {
			if (err) {
				throw err;
			}
			res.json(politician);
		});
	})
	.put(function (req, res) {
		Politician.findOneAndUpdate(
			{'_id':req.params.id},
			req.body,
			function (err, politicians) {
  			res.json(politicians);
			});
	});


app.get('/file/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/client/data/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

db.sequelize
  .sync();

var mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function () {
	var server = app.listen(3000, function () {
		console.log('Listening on port', 3000);
	});

});
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CONFIG = require('./config');
var methodOverride = require('method-override');

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
	district_area: String,
	politician_committee: String,
	politician_measures: String,
	politician_experience: String,
	politician_accomplishments: String,
	author: String

});
// collection name will get pluralized by mongoose
var Politician = mongoose.model('Politician', poliSchema);


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


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


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	var server = app.listen(CONFIG.PORT, function () {
		console.log('Listening on port', CONFIG.PORT);
	});
});
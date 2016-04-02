var db = require('../models');
var crimes = require('../crime-dataset-location');
var Promise = require('bluebird');

Promise.all(crimes) // bluebird docs
.then(function (crimes) {
  db.crime.bulkCreate(crimes.filter(function (crime) {
    return crime;
  }))
  .then(function() {  
    return db.crime.findAll();
  }).then(function(crimes) {
    console.log(crimes);
  });
  // fs.writeFile('crime-dataset-location.json', JSON.stringify(crimes), function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('crime-dataset-location.json');
  // });
}); 
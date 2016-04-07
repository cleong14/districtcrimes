var db = require('../models');
var crimes = require('../crime-dataset-location');
var Promise = require('bluebird');
var gju = require('geojson-utils');
var house = require('./house-hshd.geo.json');
var senate = require('./senate-hssd.geo.json');

var houseArr = house.features;
var senateArr = senate.features;

var check = function (point, polygon) {

  return gju.pointInPolygon(
    {"type":"Point","coordinates": point},
    {"type":"Polygon", "coordinates": polygon}
  );
};

for (var k = 0; k < crimes.length; k++) {
  var currentCrime = crimes[k];
  // console.log(currentCrime);

  if (currentCrime.longitude !== null) {
    myPoint = [currentCrime.longitude, currentCrime.latitude];

    for (var i = 0; i < houseArr.length; i++) {

      if (check(myPoint, houseArr[i].geometry.coordinates)) {
        console.log("Crime " + currentCrime.objectID + " occurred in District: " + (i + 1));
        currentCrime.houseDistrict = (i + 1);
        // console.log(currentCrime);
        // db.crimes.create(currentCrime);
        // console.log(currentCrime);
      }
    }

    for (var m = 0; m < senateArr.length; m++) {

      if (check(myPoint, senateArr[m].geometry.coordinates)) {
        console.log("Crime " + currentCrime.objectID + " occurred in District: " + (m + 1));
        currentCrime.senateDistrict = (m + 1);
        console.log(currentCrime);
        // db.crimes.create(currentCrime);
        // console.log(currentCrime);
      }
    }
  }
}

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
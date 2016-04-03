var gju = require('geojson-utils');
var db = require('../models');
var house = require('./house-hshd.geo.json');
var crime = require('../crime-dataset-location.json');

var houseArr = house.features;

var check = function (point, polygon) {

  return gju.pointInPolygon(
    {"type":"Point","coordinates": point},
    {"type":"Polygon", "coordinates": polygon}
  );
};

for (var k = 18155; k < crime.length; k++) {
  var currentCrime = crime[k];
  // console.log(currentCrime);

  if (currentCrime.longitude !== null) {
    myPoint = [currentCrime.longitude, currentCrime.latitude];

    for (var i = 0; i < houseArr.length; i++) {

      if (check(myPoint, houseArr[i].geometry.coordinates)) {
        console.log("Crime "+currentCrime.objectID+" occurred in District: " + (i+1));
        currentCrime.houseDistrict = (i + 1);
        console.log(currentCrime);
        db.crime.create(currentCrime);
        // console.log(currentCrime);
      }
    }
  }
}
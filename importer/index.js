var db = require('../models');
var crime = require('../mini-crime-dataset');
var Promise = require('bluebird');

var geocoderProvider = 'google';
var httpsAdapter = 'https';
// optional
var extra = {
    apiKey: 'AIzaSyDlkDom_yp5DBKwhvov41CsLmNcfG7Hulw', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpsAdapter, extra);

var containerArr = crime.data;
var singleCrime;
var crimeObjId;
var crimeDate;
var crimeType;
var crimeLocation;
var crimeObjArr = [];

for (var i = 0; i < containerArr.length; i++) {
  singleCrime = containerArr[i];
  console.log(singleCrime.length);
  for (var k = 0; k < singleCrime.length; k++) {
    crimeObjId = parseInt(singleCrime[8]);
    crimeDate = singleCrime[13];
    crimeType = singleCrime[14];
    crimeLocation = singleCrime[10];
    // console.log(crimeObjId);

    if (crimeDate.toString().length !== 13) {
      crimeDate = crimeDate * 1000;
    }
  }
  // console.log(crimeLocation);
  crimeObjArr.push(fetchGeoCodeLocation(crimeObjId, crimeDate, crimeType, crimeLocation));
}

Promise.all(crimeObjArr) // bluebird docs
.then(function (crimes) {
  console.log(crimes);
  db.crime.bulkCreate(crimes)
  .then(function() {  
    return db.crime.findAll();
  }).then(function(crimes) {
    console.log(crimes);
  });
  // console.log(crimes);
}); 

function fetchGeoCodeLocation (crimeObjId, crimeDate, crimeType, crimeLocation) {
  return geocoder.geocode(crimeLocation + ' Hawaii')
  .then(function(res) {
    var crimeObj;

    if (res[0].administrativeLevels.level1short !== 'HI') {
      crimeObj = {
        objectID: crimeObjId,
        date: new Date(crimeDate),
        type: crimeType,
        location: crimeLocation,
        latitude: null,
        longitude: null,
        createdAt: new Date(),
        updatedAt: new Date ()
      };
    } else {
      crimeObj = {
        objectID: crimeObjId,
        date: new Date(crimeDate),
        type: crimeType,
        location: crimeLocation,
        latitude: res[0].latitude,
        longitude: res[0].longitude,
        createdAt: new Date(),
        updatedAt: new Date ()
      };
    }
    return crimeObj;
  });
}
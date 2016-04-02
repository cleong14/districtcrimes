var db = require('../models');
var crime = require('../crime-dataset');
var Promise = require('bluebird');
var fs = require('fs');

var geocoderProvider = 'google';
var httpsAdapter = 'https';
// optional
var extra = {
    apiKey: 'AIzaSyCxIkf2Zr_PZyu1Oj5G9CDRLRHN94Qz7AU', // for Mapquest, OpenCage, Google Premier
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
  console.log(i);
  for (var k = 0; k < singleCrime.length; k++) {
    crimeObjId = parseInt(singleCrime[8]);
    crimeDate = singleCrime[13];
    crimeType = singleCrime[14];
    crimeLocation = singleCrime[10];

    if (crimeDate.toString().length !== 13) {
      crimeDate = crimeDate * 1000;
    }
  }
  crimeObjArr.push(fetchGeoCodeLocation(crimeObjId, crimeDate, crimeType, crimeLocation, i));
}

Promise.all(crimeObjArr) // bluebird docs
.then(function (crimes) {
  // db.crime.bulkCreate(crimes.filter(function (crime) {
  //   return crime;
  // }))
  // .then(function() {  
  //   return db.crime.findAll();
  // }).then(function(crimes) {
  //   console.log(crimes);
  // });
  fs.writeFile('crime-dataset-location.json', JSON.stringify(crimes), function (err) {
    if (err) {
      console.log(err);
    }
    console.log('crime-dataset-location.json');
  });
}); 

function fetchGeoCodeLocation (crimeObjId, crimeDate, crimeType, crimeLocation, i) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      geocoder.geocode(crimeLocation + ' Hawaii',
      function(err, res) {
        if (err) {
          return resolve(null);
        }

        var crimeObj;
        console.log(crimeObjId);

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
        return resolve(crimeObj);
      });
    }, 200 * i);
  });
}
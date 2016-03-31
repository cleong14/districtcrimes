var db = require('../models');
var crime = require('../mini-crime-dataset');

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
var crimeObj;
var crimeObjArr = [];

for (var i = 0; i < containerArr.length; i++) {
  singleCrime = containerArr[i];
  // console.log('=============');
  for (var k = 0; k < singleCrime.length; k++) {
    crimeObjId = parseInt(singleCrime[8]);
    crimeDate = singleCrime[13];
    crimeType = singleCrime[14];
    crimeLocation = singleCrime[10];

    if (crimeDate.toString().length !== 13) {
      crimeDate = crimeDate * 1000;
    }
  }

  console.log(crimeLocation);
  geocoder.geocode(crimeLocation + ' Hawaii', function(err, res) {
    console.log(res[0]);

  });
  // build obj here
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

  crimeObjArr.push(crimeObj);
}

for (var m = 0; m < crimeObjArr.length; m++) {
  var currentCrimeObj = crimeObjArr[m];
  // console.log(currentCrimeObj.location);
  // Using callback
  geocoder.geocode(currentCrimeObj.location + ' Hawaii', function(err, res) {
      // if (err) {
      //   throw new Error('Sum Ting Wong');
      // }
      // console.log(res);
      for (var p = 0; p < res.length; p++) {
        var currentGeo = res[p];
        // console.log(currentGeo); // currentGeo.latitude/currentGeo.longitude
        if (currentGeo.administrativeLevels.level1short !== 'HI') {
          currentCrimeObj.latitude = null;
          currentCrimeObj.longitude = null;
          // console.log('didnt work');
        } else {
          currentCrimeObj.latitude = currentGeo.latitude;
          currentCrimeObj.longitude = currentGeo.longitude;
          // console.log(crimeObj.latitude, crimeObj.longitude);
          // console.log(currentCrimeObj);
          crimeObjArr.push(currentCrimeObj);
        }
      }
  });
}
// console.log(1111111111111);

// console.log(crimeObjArr);

// db.crime.bulkCreate(crimeObjArr)
// .then(function() {  
//   return db.crime.findAll();
// }).then(function(crimes) {
//   console.log(crimes);
// });

// TODO:
// 1. create crime obj to pass through create
// 2. look up bulk insert so you can insert many at once instead of one at a time
// 3. if same type of crime in same location, just increase count?
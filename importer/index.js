var db = require('../models');
var crime = require('../mini-crime-dataset');

var containerArr = crime.data;
var singleCrime;
var crimeDate;
var crimeType;
var crimeLocation;
var crimeObj;
var crimeObjArr = [];

for (var i = 0; i < containerArr.length; i++) {
  singleCrime = containerArr[i];
  console.log('=============');
  for (var k = 0; k < singleCrime.length; k++) {
    crimeDate = singleCrime[13];
    crimeType = singleCrime[14];
    crimeLocation = singleCrime[10];
    // console.log(crimeType);

    if (crimeDate.toString().length !== 13) {
      crimeDate = crimeDate * 1000;
    }
    // console.log(crimeDate, crimeType, crimeLocation);
  }
  // build obj here
  // console.log(crimeDate);
  // console.log(crimeType);
  crimeObj = {
    date: new Date(crimeDate),
    type: crimeType,
    // typeCount: 1,
    location: crimeLocation,
    // locationCount: 1,
    createdAt: new Date(),
    updatedAt: new Date ()
  };
  crimeObjArr.push(crimeObj);
}

console.log(crimeObjArr);

db.crime.bulkCreate(crimeObjArr)
.then(function() {
  return db.crime.findAll();
}).then(function(crimes) {
  console.log(crimes);
});


// for (var j = 0; j < crimeObjArr.length; j++) {
//   console.log(crimeObjArr[j]);
// }

// TODO:
// 1. create crime obj to pass through create
// 2. look up bulk insert so you can insert many at once instead of one at a time
// 3. if same type of crime in same location, just increase count?


// db.crime.create({
//   date: new Date(1447785240000),
//   type: 'MOTOR VEHICLE THEFT',
//   location: 'H3W HALAWA VLY  UP',
//   createdAt: new Date(),
//   updatedAt: new Date()
// });
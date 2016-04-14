var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var moment = require('moment');
var range = require('moment-range');
moment().format();

var start = new Date(2015, 8, 24);
var end = new Date(2016, 2, 29);
var range = moment.range(start, end);
// console.log(range);

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    var lines = [
      {
      label: 'THEFT/LARCENY',
      values: [{x: new Date(2015, 8, 24), y: 0}]
      },
      {
      label: 'VEHICLE BREAK-IN/THEFT',
      values: [{x: new Date(2015, 8, 24), y: 0}]
      },
      {
      label: 'VANDALISM',
      values: [{x: new Date(2015, 8, 24), y: 0}]
      },
      {
      label: 'MOTOR VEHICLE THEFT',
      values: [{x: new Date(2015, 8, 24), y: 0}]
      },
      {
      label: 'BURGLARY',
      values: [{x: new Date(2015, 8, 24), y: 0}]
      }
    ];
    // TODO:
    // calculate min and max domain from props data

    var xScale = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    // xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]);
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {lines: lines, xScale: xScale};
  },

  componentWillMount: function() {

    // code to run just before adding the map

  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(newProps) {
    this.totalCrimesPerWeek(newProps.chamber);
    // this.drawLines();
  },

  componentWillUnmount: function() {
  },

  getDistrictInfo: function (districtNumber) {
    if (this.props.districtData) {
      var chamber = this.props.districtData[this.props.chamber];
      for (var i=0; i < chamber.length; i++) {
        if (chamber[i].district_name === districtNumber) {
          return chamber[i];
        }
      }
    }
  },

  totalCrimesPerWeek: function (chamber) {
    if (this.props.senateCrimes) {

      var allCrimes;
      switch (chamber) {
        case 'house':
          allCrimes = this.props.houseCrimes;
          break;
        case 'senate':
          allCrimes = this.props.senateCrimes;
          break;
      }

      var initialValue = {};

      var reducer = function(newObj, crimeGlob) {
        // total crimes
        if (!newObj[crimeGlob.to_timestamp]) {
          newObj[crimeGlob.to_timestamp] = {
            total: parseInt(crimeGlob.count)
          };
          newObj[crimeGlob.to_timestamp][crimeGlob.type] = parseInt(crimeGlob.count);
        } else {
          newObj[crimeGlob.to_timestamp].total += parseInt(crimeGlob.count);
          if (!newObj[crimeGlob.to_timestamp][crimeGlob.type]) {
            newObj[crimeGlob.to_timestamp][crimeGlob.type] = parseInt(crimeGlob.count);
          } else {
            newObj[crimeGlob.to_timestamp][crimeGlob.type] += parseInt(crimeGlob.count);
          }
        }
        return newObj;
      };

      var result = allCrimes.reduce(reducer, initialValue);

      // for (var i=1; i < 50; i++) {
      //   if(!result["district"+i]) {
      //     result["district"+i] = {
      //       "total": 0,
      //       "BURGLARY": 0,
      //       "MOTOR VEHICLE THEFT": 0,
      //       "THEFT/LARCENY": 0,
      //       "VANDALISM": 0,
      //       "VEHICLE BREAK-IN/THEFT": 0
      //     };
      //   }
      // }

      this.setState({
        allCrimes: result
      });

      // console.log(this.state.allCrimes);
    }
  },

  drawLines: function () {
    var theftLarcenyObj = {};
    var vehicleBreakInTheftObj = {};
    var vandalismObj = {};
    var motorVehicleTheftObj = {};
    var burglaryObj;

    if (this.props.senateCrimes) {
      // for (var i = 0; i < this.props.senateCrimes.length; i++) {
      //   var currentCrime = this.props.senateCrimes[i];
      //   // console.log(currentCrime.to_timestamp.length);
      //   var year = currentCrime.to_timestamp[0] + currentCrime.to_timestamp[1] + currentCrime.to_timestamp[2] + currentCrime.to_timestamp[3];
      //   var month = currentCrime.to_timestamp[5] + currentCrime.to_timestamp[6];
      //   var day = currentCrime.to_timestamp[8] + currentCrime.to_timestamp[9];
        // var newDate = year + ', ' + (month - 1) + ', ' + day;
        // console.log(newDate);
        // for line chart: {x: new Date(newDate), y: this.state.allCrimes.}
        for (var obj in this.state.allCrimes) {
          var year = obj[0] + obj[1] + obj[2] + obj[3];
          var month = obj[5] + obj[6];
          var day = obj[8] + obj[9];
          var newDate = year + ', ' + (month - 1) + ', ' + day;

          // this.state.lines[4].values.push({x: new Date (newDate), y: this.state.allCrimes[obj].BURGLARY});
          // console.log(this.state.lines[4]);
          // console.log(new Date(newDate));
          // console.log(obj);
          // console.log(newDate);

          // console.log(this.state.allCrimes[obj].BURGLARY);
          // console.log(Object.keys(this.state.allCrimes[obj]));
          for (var k = 0; k < this.state.lines.length; k++) {
            // this.state.lines[4].values.push({x: new Date(newDate), y: this.state.allCrimes[obj].BURGLARY});
            // this.state.lines[3].values.push({x: new Date(newDate), y: this.state.allCrimes[obj]['MOTOR VEHICLE THEFT']});
            // this.state.lines[2].values.push({x: new Date(newDate), y: this.state.allCrimes[obj].VANDALISM});
            // this.state.lines[1].values.push({x: new Date(newDate), y: this.state.allCrimes[obj]['VEHICLE BREAK-IN/THEFT']});
            // this.state.lines[0].values.push({x: new Date(newDate), y: this.state.allCrimes[obj]['THEFT/LARCENY']});

            // console.log(this.state.allCrimes[obj]);
            // console.log(this.state.lines[k].values);
          }
        }
      // }
      // console.log(Object.keys(this.state.allCrimes));
      // console.log(this.state.lines);
      // console.log(this.state.allCrimes);
      // console.log(Object.keys(this.state.allCrimes));
    }
    // this.setState({
    //   lines: data
    // });
  },

  render: function() {
    this.drawLines();

    // return our JSX that is rendered to the DOM
    if (this.props.districtData) {
      var districtInfo = this.getDistrictInfo(this.props.districtNumber);
      return (
        <div id="summary">
          <div id="politician">
            <img id="photo" src={districtInfo.politician_picture}/>
            <h4>{districtInfo.politician_firstname} {districtInfo.politician_lastname}</h4>
            <p>TEL: {districtInfo.contact_phone}</p>
            <p>E-mail: <a href={districtInfo.contact_email}>{districtInfo.contact_email}</a></p>
          </div>

          <LineChart
            data={this.state.lines}
            width={800}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            xScale={this.state.xScale}
            xAxis={{tickValues: this.state.xScale.ticks(d3.time.day, 7), tickFormat: d3.time.format("%m/%d")}}
          />
        </div>
      );
    }
    return null;
  }

});

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;



// var Politician = React.createClass({
//   componentWillReceiveProps: function(newProps) {
//     console.log(newProps);
//     this.getPhotoUrl(newProps.districtNumber);
//   },

//   getPhotoUrl: function (districtNumber) {
//     if (this.props.districtData) {
//       var url;
//       for (var i=0; i < this.props.districtData[this.props.chamber].length; i++) {
//         if (this.props.districtData[this.props.chamber][i].district_name === districtNumber) {
//           url = this.props.districtData[this.props.chamber][i].politician_picture;
//         }
//         break;
//       }
//       console.log(url);
//       return url;
//     }
//   },

//   render: function () {
//     return (
//       <div>
//         <img src={} />
//       </div>
//     )
//   }
// });


// working sql query
// SELECT date_trunc('week',crimes.date) as "crimes_date", crimes.type, "houseDistrict", "senateDistrict", count(crimes.type) as "crimes_count"
// FROM crimes
// GROUP BY "crimes_date", crimes.type, "houseDistrict", "senateDistrict"
// ORDER BY crimes.type;
var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var moment = require('moment');
var range = require('moment-range');
moment().format();

var datesArr = [];
var objArr = [];
// console.log(range);

// console.log(moment().toObject());

var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.

  getInitialState: function() {
    var allCrimes = [];
    var lines = [
      {
      label: 'THEFT/LARCENY',
      values: []
      },
      {
      label: 'VEHICLE BREAK-IN/THEFT',
      values: []
      },
      {
      label: 'VANDALISM',
      values: []
      },
      {
      label: 'MOTOR VEHICLE THEFT',
      values: []
      },
      {
      label: 'BURGLARY',
      values: []
      }
    ];
    // TODO:
    // calculate min and max domain from props data

    var xScale = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    // xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400 - 70]);
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {lines: lines, xScale: xScale, allCrimes: allCrimes};
  },

  componentWillMount: function() {

    // code to run just before adding the map

  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(newProps) {
    this.totalCrimesPerWeek(newProps.chamber);
  },

  componentDidUpdate: function () {
    this.drawLines();
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

      var resultArr = [];

      for (var week in result) {
        resultArr.push({
          time: new Date(week),
          values: result[week]
        });
      }

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
        allCrimes: resultArr
      }, () => {
        console.log(this.state);
      });

      console.log(this.state.allCrimes);
    }
  },

  runSort: function () {
    if (this.props.senateCrimes) {
      // console.log(this.state.allCrimes);
      this.state.allCrimes.sort(function (a, b) {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        return 0;
      });
    }
  },

  drawLines: function () {
    var theftLarcenyObj = {};
    var vehicleBreakInTheftObj = {};
    var vandalismObj = {};
    var motorVehicleTheftObj = {};
    var burglaryObj;
    var allDates;

    if (this.props.senateCrimes) {
      this.runSort();

      var theftArr  = [];
      var vehicleArr  = [];
      var vandalismArr  = [];
      var motorArr  = [];
      var burglaryArr  = [];

      for (var i = 0; i < this.state.allCrimes.length; i++) {
        theftArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['THEFT/LARCENY']});
        vehicleArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['VEHICLE BREAK-IN/THEFT']});
        vandalismArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values.VANDALISM});
        motorArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['MOTOR VEHICLE THEFT']});
        burglaryArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values.BURGLARY});
      }

      this.setState({lines: [
        {label: 'THEFT/LARCENY', values: theftArr},
        {label: 'VEHICLE BREAK-IN', values: vehicleArr},
        {label: 'VANDALISM', values: vandalismArr},
        {label: 'MOTOR VEHICLE THEFT', values: motorArr},
        {label: 'BURGLARY', values: burglaryArr}
      ]});
    }
  },

  render: function() {

    // return our JSX that is rendered to the DOM
    if (this.props.districtData) {
      if (this.state.lines.every(line => !line.values.length)) {
        return null;
      }

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
            interpolate="linear"
            width={800}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            xScale={this.state.xScale}
            xAxis={{tickValues: this.state.xScale.ticks(d3.time.month, 1), tickFormat: d3.time.format("%m/%d")}}
          />
        </div>
      );
    }
    return null;
  }

});

function isSameObject (a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

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
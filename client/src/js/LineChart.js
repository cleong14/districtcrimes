var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var moment = require('moment');
var range = require('moment-range');

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
    // var xScaleBrush = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    var color = d3.scale.ordinal().domain(['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY']).range(['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']);

    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {
      lines: lines,
      xScale: xScale,
      // xScaleBrush: xScaleBrush,
      color: color,
      allCrimes: allCrimes
    };
  },

  componentWillMount: function() {

    // code to run just before adding the map

  },

  componentDidMount: function() {

  },

  componentWillReceiveProps: function(newProps) {
    this.totalCrimesPerWeek(newProps);
    this.drawLines(newProps);
  },

  componentDidUpdate: function () {

  },

  componentWillUnmount: function() {

  },

  totalCrimesPerWeek: function (newProps) {
    if (newProps.senateCrimes) {

      var allCrimes;
      switch (newProps.chamber) {
        case 'house':
          allCrimes = newProps.houseCrimes;
          break;
        case 'senate':
          allCrimes = newProps.senateCrimes;
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

      this.setState({
        allCrimes: resultArr
      }, () => {
        // console.log(this.state);
      });

      // console.log(this.state.allCrimes);
    }
  },

  // runSort: function () {
  //   if (this.props.senateCrimes) {
  //     this.state.allCrimes.sort(function (a, b) {
  //       if (a.time > b.time) {
  //         return 1;
  //       }
  //       if (a.time < b.time) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //   }
  // },

  drawLines: function (newProps) {
    if (newProps.chamber === 'senate') {

      var senateTheftArr  = [];
      var senateVehicleArr  = [];
      var senateVandalismArr  = [];
      var senateMotorArr  = [];
      var senateBurglaryArr  = [];
      var senateDistrictArr = [];

      for (var k = 0; k < 25; k++) {
        senateDistrictArr.push(k + 1);
      }

      console.log(senateDistrictArr);

      console.log(newProps);

      newProps.filter.filter(function (crime) {

        console.log(crime);
        var totalDailyTheft = 0;
        var totalDailyVehicle = 0;
        var totalDailyVandalism = 0;
        var totalDailyMotor = 0;
        var totalDailyBurglary = 0;
        var currentDateStr;

        if (newProps.districtNumber === 0) {
          for (var i = 0; i < newProps.senateCrimes.length; i++) {
            if (currentDateStr !== newProps.senateCrimes[i].to_timestamp) {
              // console.log('old date', currentDateStr);
              currentDateStr = newProps.senateCrimes[i].to_timestamp;
              // console.log('new date', currentDateStr);

              if (crime === 'THEFT/LARCENY' && newProps.senateCrimes[i].type === 'THEFT/LARCENY') {
                // console.log(newProps.senateCrimes[i]);
                totalDailyTheft += parseInt(newProps.senateCrimes[i].count);
                senateTheftArr.push({x: new Date(currentDateStr), y: totalDailyTheft});
                totalDailyTheft = 0;
              }
              if (crime === 'VEHICLE BREAK-IN/THEFT' && newProps.senateCrimes[i].type === 'VEHICLE BREAK-IN/THEFT') {
                totalDailyVehicle += parseInt(newProps.senateCrimes[i].count);
                senateVehicleArr.push({x: new Date(currentDateStr), y: totalDailyVehicle});
                totalDailyVehicle = 0;
              }
              if (crime === 'VANDALISM' && newProps.senateCrimes[i].type === 'VANDALISM') {
                totalDailyVandalism += parseInt(newProps.senateCrimes[i].count);
                senateVandalismArr.push({x: new Date(currentDateStr), y: totalDailyVandalism});
                totalDailyVandalism = 0;
              }
              if (crime === 'MOTOR VEHICLE THEFT' && newProps.senateCrimes[i].type === 'MOTOR VEHICLE THEFT') {
                totalDailyMotor += parseInt(newProps.senateCrimes[i].count);
                senateMotorArr.push({x: new Date(currentDateStr), y: totalDailyMotor});
                totalDailyMotor = 0;
              }
              if (crime === 'BURGLARY' && newProps.senateCrimes[i].type === 'BURGLARY') {
                totalDailyBurglary += parseInt(newProps.senateCrimes[i].count);
                senateBurglaryArr.push({x: new Date(currentDateStr), y: totalDailyBurglary});
                totalDailyBurglary = 0;
              }
            }
          }
        }

        senateDistrictArr.filter(function (districtNumber) {
          if (districtNumber === newProps.districtNumber) { // district number related to map
            for (var i = 0; i < newProps.senateCrimes.length; i++) {

              if (districtNumber === newProps.senateCrimes[i].district) { // check if any crimes match district number
                  
                if (currentDateStr !== newProps.senateCrimes[i].to_timestamp) {
                  currentDateStr = newProps.senateCrimes[i].to_timestamp;
                  
                  if (crime === 'THEFT/LARCENY' && newProps.senateCrimes[i].type === 'THEFT/LARCENY') {
                    totalDailyTheft += parseInt(newProps.senateCrimes[i].count);
                    senateTheftArr.push({x: new Date(currentDateStr), y: totalDailyTheft});
                    totalDailyTheft = 0;
                  }
                  if (crime === 'VEHICLE BREAK-IN/THEFT' && newProps.senateCrimes[i].type === 'VEHICLE BREAK-IN/THEFT') {
                    totalDailyVehicle += parseInt(newProps.senateCrimes[i].count);
                    senateVehicleArr.push({x: new Date(currentDateStr), y: totalDailyVehicle});
                    totalDailyVehicle = 0;
                  }
                  if (crime === 'VANDALISM' && newProps.senateCrimes[i].type === 'VANDALISM') {
                    totalDailyVandalism += parseInt(newProps.senateCrimes[i].count);
                    senateVandalismArr.push({x: new Date(currentDateStr), y: totalDailyVandalism});
                    totalDailyVandalism = 0;
                  }
                  if (crime === 'MOTOR VEHICLE THEFT' && newProps.senateCrimes[i].type === 'MOTOR VEHICLE THEFT') {
                    totalDailyMotor += parseInt(newProps.senateCrimes[i].count);
                    senateMotorArr.push({x: new Date(currentDateStr), y: totalDailyMotor});
                    totalDailyMotor = 0;
                  }
                  if (crime === 'BURGLARY' && newProps.senateCrimes[i].type === 'BURGLARY') {
                    totalDailyBurglary += parseInt(newProps.senateCrimes[i].count);
                    senateBurglaryArr.push({x: new Date(currentDateStr), y: totalDailyBurglary});
                    totalDailyBurglary = 0;
                  }
                }
              }
            }
          }
        });
      });

      this.setState({lines: [
        {label: 'THEFT/LARCENY', values: senateTheftArr},
        {label: 'VEHICLE BREAK-IN', values: senateVehicleArr},
        {label: 'VANDALISM', values: senateVandalismArr},
        {label: 'MOTOR VEHICLE THEFT', values: senateMotorArr},
        {label: 'BURGLARY', values: senateBurglaryArr}
      ]});
    }

    if (newProps.chamber === 'house') {

      var houseTheftArr  = [];
      var houseVehicleArr  = [];
      var houseVandalismArr  = [];
      var houseMotorArr  = [];
      var houseBurglaryArr  = [];
      var houseDistrictArr = [];

      for (var m = 0; m < 51; m++) {
        houseDistrictArr.push(m + 1);
      }

      console.log(houseDistrictArr);

      console.log(newProps);

      newProps.filter.filter(function (crime) {

        console.log(crime);

        var totalDailyTheft = 0;
        var totalDailyVehicle = 0;
        var totalDailyVandalism = 0;
        var totalDailyMotor = 0;
        var totalDailyBurglary = 0;
        var currentDateStr;

        if (newProps.districtNumber === 0) {
          for (var i = 0; i < newProps.houseCrimes.length; i++) {
            if (currentDateStr !== newProps.houseCrimes[i].to_timestamp) {
              // console.log('old date', currentDateStr);
              currentDateStr = newProps.houseCrimes[i].to_timestamp;
              // console.log('new date', currentDateStr);

              if (crime === 'THEFT/LARCENY' && newProps.houseCrimes[i].type === 'THEFT/LARCENY') {
                // console.log(newProps.houseCrimes[i]);
                totalDailyTheft += parseInt(newProps.houseCrimes[i].count);
                houseTheftArr.push({x: new Date(currentDateStr), y: totalDailyTheft});
                totalDailyTheft = 0;
              }
              if (crime === 'VEHICLE BREAK-IN/THEFT' && newProps.houseCrimes[i].type === 'VEHICLE BREAK-IN/THEFT') {
                totalDailyVehicle += parseInt(newProps.houseCrimes[i].count);
                houseVehicleArr.push({x: new Date(currentDateStr), y: totalDailyVehicle});
                totalDailyVehicle = 0;
              }
              if (crime === 'VANDALISM' && newProps.houseCrimes[i].type === 'VANDALISM') {
                totalDailyVandalism += parseInt(newProps.houseCrimes[i].count);
                houseVandalismArr.push({x: new Date(currentDateStr), y: totalDailyVandalism});
                totalDailyVandalism = 0;
              }
              if (crime === 'MOTOR VEHICLE THEFT' && newProps.houseCrimes[i].type === 'MOTOR VEHICLE THEFT') {
                totalDailyMotor += parseInt(newProps.houseCrimes[i].count);
                houseMotorArr.push({x: new Date(currentDateStr), y: totalDailyMotor});
                totalDailyMotor = 0;
              }
              if (crime === 'BURGLARY' && newProps.houseCrimes[i].type === 'BURGLARY') {
                totalDailyBurglary += parseInt(newProps.houseCrimes[i].count);
                houseBurglaryArr.push({x: new Date(currentDateStr), y: totalDailyBurglary});
                totalDailyBurglary = 0;
              }
            }
          }     
        }

        houseDistrictArr.filter(function (districtNumber) {
          if (districtNumber === newProps.districtNumber) {
            console.log(districtNumber);
            for (var i = 0; i < newProps.houseCrimes.length; i++) {

              if (districtNumber === newProps.houseCrimes[i].district) {

                if (currentDateStr !== newProps.houseCrimes[i].to_timestamp) {
                  currentDateStr = newProps.houseCrimes[i].to_timestamp;

                  if (crime === 'THEFT/LARCENY' && newProps.houseCrimes[i].type === 'THEFT/LARCENY') {
                    // console.log(newProps.houseCrimes[i]);
                    totalDailyTheft += parseInt(newProps.houseCrimes[i].count);
                    houseTheftArr.push({x: new Date(currentDateStr), y: totalDailyTheft});
                    totalDailyTheft = 0;
                  }
                  if (crime === 'VEHICLE BREAK-IN/THEFT' && newProps.houseCrimes[i].type === 'VEHICLE BREAK-IN/THEFT') {
                    totalDailyVehicle += parseInt(newProps.houseCrimes[i].count);
                    houseVehicleArr.push({x: new Date(currentDateStr), y: totalDailyVehicle});
                    totalDailyVehicle = 0;
                  }
                  if (crime === 'VANDALISM' && newProps.houseCrimes[i].type === 'VANDALISM') {
                    totalDailyVandalism += parseInt(newProps.houseCrimes[i].count);
                    houseVandalismArr.push({x: new Date(currentDateStr), y: totalDailyVandalism});
                    totalDailyVandalism = 0;
                  }
                  if (crime === 'MOTOR VEHICLE THEFT' && newProps.houseCrimes[i].type === 'MOTOR VEHICLE THEFT') {
                    totalDailyMotor += parseInt(newProps.houseCrimes[i].count);
                    houseMotorArr.push({x: new Date(currentDateStr), y: totalDailyMotor});
                    totalDailyMotor = 0;
                  }
                  if (crime === 'BURGLARY' && newProps.houseCrimes[i].type === 'BURGLARY') {
                    totalDailyBurglary += parseInt(newProps.houseCrimes[i].count);
                    houseBurglaryArr.push({x: new Date(currentDateStr), y: totalDailyBurglary});
                    totalDailyBurglary = 0;
                  }
                }
              }
            }
          }
        });
      });

      this.setState({lines: [
        {label: 'THEFT/LARCENY', values: houseTheftArr},
        {label: 'VEHICLE BREAK-IN', values: houseVehicleArr},
        {label: 'VANDALISM', values: houseVandalismArr},
        {label: 'MOTOR VEHICLE THEFT', values: houseMotorArr},
        {label: 'BURGLARY', values: houseBurglaryArr}
      ]});
    }
  },

  render: function() {

    // return our JSX that is rendered to the DOM
    if (this.state.lines.every(line => !line.values.length)) {
      return null;
    }

    return (
      <div id="summary">
        <LineChart
          data={this.state.lines}
          interpolate="linear"
          width={800}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          xScale={this.state.xScale}
          xAxis={{tickValues: this.state.xScale.ticks(d3.time.month, 1), tickFormat: d3.time.format("%m/%d")}}
          color={this.state.color}
        />
      </div>
    );
    return null;
  },
});

function isSameObject (a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;


          // <div className="brush" style={{float: 'none'}}>
          // <Brush
          //   width={400}
          //   height={50}
          //   margin={{top: 0, bottom: 30, left: 50, right: 20}}
          //   xScale={this.state.xScaleBrush}
          //   extent={[new Date(2015, 8, 24), new Date(2015, 9, 24)]}
          //   onChange={this._onChange}
          //   xAxis={{tickValues: this.state.xScaleBrush.ticks(d3.time.month, 1), tickFormat: d3.time.format("%m/%d")}}
          // />
          // </div>


  // _onChange: function (extent) {
  //   this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400-70])});
  // }
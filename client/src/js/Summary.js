var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var moment = require('moment');
var range = require('moment-range');
// moment().format();

// var datesArr = [];
// var objArr = [];

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
    var xScaleBrush = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    var color = d3.scale.ordinal().domain(['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY']).range(['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']);

    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {lines: lines, xScale: xScale, xScaleBrush: xScaleBrush, color: color, allCrimes: allCrimes};
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
    // this.drawLines();
  },

  componentWillUnmount: function() {

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

  drawLines: function () {
    if (this.props.senateCrimes) {

      // this.runSort();

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
    if (this.state.lines.every(line => !line.values.length)) {
      return null;
    }

    return (
      <div id="summary">

      </div>
    );
  },

  _onChange: function (extent) {
    this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400-70])});
  }

});

function isSameObject (a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

// export our Summary component so that Browserify can include it with other components that require it
module.exports = Summary;

        // <LineChart
        //   data={this.state.lines}
        //   interpolate="linear"
        //   width={800}
        //   height={400}
        //   margin={{top: 10, bottom: 50, left: 50, right: 10}}
        //   xScale={this.state.xScale}
        //   xAxis={{tickValues: this.state.xScale.ticks(d3.time.month, 1), tickFormat: d3.time.format("%m/%d")}}
        //   color={this.state.color}
        // />
        // <div className="brush" style={{float: 'none'}}>
        //   <Brush
        //     width={400}
        //     height={50}
        //     margin={{top: 0, bottom: 30, left: 50, right: 20}}
        //     xScale={this.state.xScaleBrush}
        //     extent={[new Date(2015, 8, 24), new Date(2015, 9, 24)]}
        //     onChange={this._onChange}
        //     xAxis={{tickValues: this.state.xScaleBrush.ticks(d3.time.month, 1), tickFormat: d3.time.format("%m/%d")}}
        //   />
        // </div>
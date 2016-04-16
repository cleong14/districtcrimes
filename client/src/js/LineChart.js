var React = require('react');
var d3 = require('d3');
var ReactD3 = require('react-d3-components');
var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;
var moment = require('moment');
var range = require('moment-range');

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
var Summary = React.createClass({
  //this is the Summary module to be exported. Put all code in here.
  getInitialState: function() {
    var allCrimes = [];
    // var lines = [
    //   {
    //     label: 'THEFT/LARCENY',
    //     values: []
    //   },
    //   {
    //     label: 'VEHICLE BREAK-IN/THEFT',
    //     values: []
    //   },
    //   {
    //     label: 'VANDALISM',
    //     values: []
    //   },
    //     {
    //   label: 'MOTOR VEHICLE THEFT',
    //     values: []
    //   },
    //   {
    //     label: 'BURGLARY',
    //     values: []
    //   }
    // ];
    // TODO:
    // calculate min and max domain from props data

    var xScale = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    // var xScaleBrush = d3.time.scale().domain([new Date(2015, 8, 24), new Date(2016, 2, 29)]).range([0, 400 - 70]);
    var color = d3.scale.ordinal().domain(['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY']).range(['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']);

    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {
      // lines: lines,
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
    console.log(newProps);
    this.totalCrimesPerWeek(newProps);
    this.drawLines(this.props, newProps);
  },

  componentDidUpdate: function () {
    // this.drawLines(this.props);
  },

  componentWillUnmount: function() {

  },

  totalCrimesPerWeek: function (newProps) {
    if (this.props.senateCrimes) {

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

  runSort: function () {
    if (this.props.senateCrimes) {
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

  drawLines: function (props, newProps) {
    // console.log(props);
    if (this.props.senateCrimes) {


      this.runSort();

      var theftPointObj;
      var vehicleArr  = [];
      var vandalismArr  = [];
      var motorArr  = [];
      var burglaryArr  = [];

      // console.log(newProps);

      newProps.filter.filter(function (crime) {
        // console.log(crime);
        // console.log(newProps.senateCrimes[0].type);
        for (var i = 0; i < newProps.senateCrimes.length; i++) {
          if (crime === 'THEFT/LARCENY' && newProps.senateCrimes[i].type === 'THEFT/LARCENY') {
            lines[0].values.push({x: newProps.senateCrimes[i].to_timestamp, y: parseInt(newProps.senateCrimes[i].count)});
            // console.log(newProps.senateCrimes);
            // console.log(lines);
            // console.log(newProps.senateCrimes[i].type);
            // theftPointObj = {x: newProps.senateCrimes[i].to_timestamp, y: newProps.senateCrimes[i].type}
          }   
        }
      });
      // for (var i = 0; i < this.state.allCrimes.length; i++) {
      //   // console.log(this.state.allCrimes[i]);
      //   for (var k = 0; k < this.props.filter.length; k++) {
      //     // console.log(this.state.allCrimes[i]);
      //     if (this.props.filter[k] === 'THEFT/LARCENY') {
      //       lines[0].values.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['THEFT/LARCENY']}) ;
      //     }
      //     if (this.props.filter[k] === 'VEHICLE BREAK-IN/THEFT') {
      //       vehicleArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['VEHICLE BREAK-IN/THEFT']});            
      //     }
      //     if (this.props.filter[k] === 'VANDALISM') {
      //       vandalismArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values.VANDALISM});
      //     }
      //     if (this.props.filter[k] === 'MOTOR VEHICLE THEFT') {
      //       motorArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values['MOTOR VEHICLE THEFT']});
      //     }
      //     if (this.props.filter[k] === 'BURGLARY') {
      //       burglaryArr.push({x: this.state.allCrimes[i].time, y: this.state.allCrimes[i].values.BURGLARY});
      //     }
      //   }
      // }

      // console.log(lines);

      // this.setState({lines: [
      //   {label: 'THEFT/LARCENY', values: theftArr},
      //   {label: 'VEHICLE BREAK-IN', values: vehicleArr},
      //   {label: 'VANDALISM', values: vandalismArr},
      //   {label: 'MOTOR VEHICLE THEFT', values: motorArr},
      //   {label: 'BURGLARY', values: burglaryArr}
      // ]});
      // lines = 
    }
  },

  render: function() {

    // return our JSX that is rendered to the DOM
    // if (this.state.lines.every(line => !line.values.length)) {
    //   return null;
    // }
    // console.log(lines);

    return (
      <div id="summary">
        <LineChart
          data={lines}
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

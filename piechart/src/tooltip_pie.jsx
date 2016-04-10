"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var PieTooltip = require('../../src').PieTooltip;
var SimpleTooltipStyle = require('../../src/tooltip/simple');

var generalChartData = require('./data/pie.json')

var value = function(d) {
    return +d.population;
  },
  name = function(d) {
    return d.age;
  },
  chartSeries = [
    {
      "field": "<5",
      "name": "MOTOR VEHICLE THEFT"
    },
    {
      "field": "5-13",
      "name": "THEFT/LARCENY"
    },
    {
      "field": "14-17",
      "name": "VANDALISM"
    },
    {
      "field": "18-24",
      "name": "VEHICLE BREAK-IN/THEFT"
    },
    {
      "field": "25-44",
      "name": "BURGLARY"
    }
  ];

module.exports = React.createClass({
  getInitialState: function() {
    return {
      width: 600,
      height: 400,
      series: chartSeries
    }
  },
  render: function() {

    return (
      <div>
        <PieTooltip
          width= {this.state.width}
          height= {this.state.height}
          data= {generalChartData}
          value = {value}
          name = {name}
          chartSeries = {this.state.series}
        >
          <SimpleTooltipStyle/>
        </PieTooltip>
      </div>
    )
  }
})

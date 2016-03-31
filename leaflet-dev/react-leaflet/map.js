// this is the Map component for React!
// import some dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var L = require('leaflet');
var qwest = require('qwest');
var hshd = require('hshd.json');

// let's store the map configuration properties,
// we could also move this to a separate file & require it

var config = {};

// a local variable to store our instance of L.map
var map;

// map paramaters to pass to L.map when we instantiate it
config.params = {
  center: [21.289373, -157.917480],
  zoomControl: false,
  zoom: 9,
  maxZoom: 12,
  minZoom: 11,
  scrollWheelZoom: false
};

// params for the L.tileLayer (aka basemap)
config.tileLayer = {
  url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.light',
  accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
};

var Map = React.createClass({
  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {
      tileLayer : null,
      geojsonLayer: null,
      geojson: null,
      // filter: '*',
      // numEntrances: null,
    };
  },

  init: function() {
    // this function creates the Leaflet map object and is called after the Map component mounts
    map = L.map(map1, config.params);
    // L.control.zoom({ position: "bottomleft"}).addTo(map);
    // L.control.scale({ position: "bottomleft"}).addTo(map);

    // set our state to include the tile layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.url, config.tileLayer.params).addTo(map);

    this.setState({
      tileLayer: this.state.tileLayer
    });
  },

  render : function() {
    // return our JSX that is rendered to the DOM
    // we pass our Filter component props such as subwayLines array, filter & updateMap methods
    return (
      <div id="mapUI">
        <div id="map"></div>
      </div>
    );
  }

});

// export our Map component so that Browserify can include it with other components that require it
module.exports = Map;
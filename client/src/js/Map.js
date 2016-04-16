// this is the Map component for React!
// import some dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var L = require('leaflet');

// let's store the map configuration properties,
// we could also move this to a separate file & require it
var config = {};

// a local variable to store our instance of L.map
var map;
var legend;
var info;
var geojsonLayer;
var theZoom;

// map paramaters to pass to L.map when we instantiate it
config.params = {
  center: [21.477351, -157.962799],
  zoomControl: false,
  zoom: 10,
  // maxZoom: 19,
  // minZoom: 11,
  scrollWheelZoom: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};

// params for the L.tileLayer (aka basemap)
config.tileLayer = {
  url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  params: {
    minZoom: 5,
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
  }
};

// Map gradient colors alternate for House and Senate
config.colors = {
  house: {
    level1: '#eff3ff',
    level2: '#c6dbef',
    level3: '#9ecae1',
    level4: '#6baed6',
    level5: '#3182bd',
    level6: '#08519c'
  },
  senate: {
    level1: '#fee5d9',
    level2: '#fcbba1',
    level3: '#fc9272',
    level4: '#fb6a4a',
    level5: '#de2d26',
    level6: '#a50f15'
  }
};

// here's the actual component
var Map = React.createClass({

  getInitialState: function() {
    // TODO: if we wanted an initial "state" for our map component we could add it here
    return {
      allCrimes: [],
      senateCrimes: [],
      houseCrimes: []
    };
  },

  // componentWillMount: function() {

  //   // code to run just before adding the map

  // },

  componentDidMount: function() {
    // code to run just after adding the map to the DOM
    // instantiate the Leaflet map object
    this.createMap(this.getID());
  },

  // After App loads jsons, they are passed to Map as props; then we can run functions based upon those loaded props
  componentWillReceiveProps: function(newProps) {
    this.totalCrimesPerDistrict(newProps);
  },

  componentWillUnmount: function() {
    // code to run just before removing the map
  },

  componentDidUpdate: function() {
    this.addGeoJSON(this.props.chamber);
    this.addInfoToMap();
    this.addLegendToMap(this.props.chamber);
    this.addZoomToMap();
  },

  // Adds a geojson overlay to map; default is Senate
  addGeoJSON: function(chamber) {

    // remove layers without using states
    if (geojsonLayer) {
      geojsonLayer.clearLayers();
    }

    //return map to center
    this.zoomToCenter();

    //pick new layer
    var data;
    switch (chamber) {
      case 'house':
        data = this.props.house;
        break;
      case 'senate':
        data = this.props.senate;
        break;
    }

    // add new layer
    geojsonLayer = L
      .geoJson(data, {
        onEachFeature: this.onEachFeature,
        style: this.style.bind(null, chamber)
      })
      .addTo(map);
  },

  // style object for Leaflet map
  style: function (chamber, feature) {
    if (!this.state.allCrimes["district"+feature.properties.objectid]) {
      return {
        "fillColor": "#707070",
        "color": "#ffffff",
        "opacity": 1,
        "weight": 1,
        "fillOpacity": 0.7
      };
    }
    var districtCrimes = this.state.allCrimes["district"+feature.properties.objectid].total;
    return {
      "fillColor": this.getColor(chamber, districtCrimes),
      "color": "#ffffff",
      "opacity": 1,
      "weight": 1,
      "fillOpacity": 0.7
    };
  },

  getColor: function (chamber, districtCrimes) {
    return  districtCrimes > 2000  ? config.colors[chamber].level6 :
            districtCrimes > 1000  ? config.colors[chamber].level5 :
            districtCrimes > 500   ? config.colors[chamber].level4 :
            districtCrimes > 250   ? config.colors[chamber].level3 :
            districtCrimes > 100   ? config.colors[chamber].level2 :
            districtCrimes > 1     ? config.colors[chamber].level1 :
                                                          '#707070';
  },

  totalCrimesPerDistrict: function (newProps) {

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
      if (!newObj["district"+crimeGlob.district]) {
        newObj["district"+crimeGlob.district] = {
          total: parseInt(crimeGlob.count)
        };
      } else {
        newObj["district"+crimeGlob.district].total += parseInt(crimeGlob.count);
      }
      return newObj;
    };
    // debugger;
    var result = allCrimes.reduce(reducer, initialValue);


    this.setState({
      allCrimes: result
    });
  },

  // Leaflet Control object - District Information
  addInfoToMap: function () {
    // remove the data from the geojson layer
    if (info){
      map.removeControl(info);
    }

    var _this = this;
    // Top right info panel
    info = this.info = L.control();
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Hawaii '+ _this.capitalizeFirstLetter(_this.props.chamber) +' Districts</h4>' +  (props ?
            '<b>'+ _this.capitalizeFirstLetter(_this.props.chamber) + ' District ' + props.objectid + '</b><br>' +
            '<b>' + _this.getLegislator(props.objectid) + '</b>' +
            '<p>Neighborhoods: ' + _this.getNeighborhoods(props.objectid) + '</p>'
            : 'Hover over a district!');
    };
    info.addTo(map);

  },

  // Leaflet Control object - Map legend
  addLegendToMap: function (chamber) {
    // bottom right legend panel
    if (legend) {
      map.removeControl(legend);
    }
    var _this = this;
    legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1, 100, 250, 500, 1000, 2000],
        labels = [];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + _this.getColor(chamber, grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    legend.addTo(map);
  },

  addZoomToMap: function () {
    // debugger;
    if (theZoom) {
      map.removeControl(theZoom);
    }

    var _this = this;
    theZoom = L.control({position: 'topleft'});

    theZoom.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'zoom');
      div.innerHTML = "<h3>Center Map</h3>" ;
      L.DomEvent.on(div, "click", this._click );
      return div;
    };

    theZoom._click = function () {
      _this.zoomToCenter();
    };

    theZoom.addTo(map);
  },

  getNeighborhoods: function (districtNumber) {
    for (var i in this.props.districtData[this.props.chamber]) {
      if (this.props.districtData[this.props.chamber][i].district_name === districtNumber) {
        return this.normalizeNeighborhoods(this.props.districtData[this.props.chamber][i].district_area);
      }
    }
  },

  normalizeNeighborhoods: function (neighborhoodList) {
    var str = "";
    for (var i = 0; i < neighborhoodList.length-1; i++) {
      str+= neighborhoodList[i] + ", ";
    }
    str+= neighborhoodList[neighborhoodList.length-1] +".";
    return str;
  },

  getLegislator: function (districtNumber) {
    var politician = "";
    for (var i in this.props.districtData[this.props.chamber]) {
      if (this.props.districtData[this.props.chamber][i].district_name === districtNumber) {
        politician += this.props.districtData[this.props.chamber][i].politician_firstname + " " + this.props.districtData[this.props.chamber][i].politician_lastname;
        break;
      }
    }
    return politician;
  },

  highlightFeature: function (e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    this.info.update(layer.feature.properties);
  },

  resetHighlight: function (e) {
    geojsonLayer.resetStyle(e.target);

    this.info.update();
  },

  zoomToFeature: function (e) {
    map.fitBounds(e.target.getBounds());
    var districtNumber = e.target.feature.properties.objectid;
    this.props.updateDistrictNumber(districtNumber);
  },

  zoomToCenter: function (e) {
    map.setView([21.477351, -157.962799], 10);
  },

  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  },

  capitalizeFirstLetter: function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  getID: function() {
    // get the "id" attribute of our component's DOM node
    return ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
  },

  createMap: function(mapElement) {
    var _this = this;
    // this function creates the Leaflet map object and is called after the Map component mounts
    map = L.map(mapElement, config.params);

    // set our state to include the tile layer
    this.state.tileLayer = L.tileLayer(config.tileLayer.url, config.tileLayer.params).addTo(map);
  },

  render : function() {
    return (
      <div id="mapUI">
        <div id="map"></div>
        <button className="button" onClick={this.zoomToCenter}>Zoom Out</button>
      </div>
    );

  }
});

// export our Map component so that Browserify can include it with other components that require it
module.exports = Map;


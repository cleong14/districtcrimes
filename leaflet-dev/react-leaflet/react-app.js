var position = [21.289373, -157.917480];
var _ReactLeaflet = ReactLeaflet;
var Map = _ReactLeaflet.Map;
var TileLayer = _ReactLeaflet.TileLayer;
var Marker = _ReactLeaflet.Marker;
var Popup = _ReactLeaflet.Popup;

var map = React.createElement(
  Map,
  {
    center: position,
    zoom: 9,
    scrollWheelZoom: false,
    // geojson: hshd,
    // geojsonLayer: asdf,

    // addGeoJSON: function(data) {
    //   this.state.geojson = data;

    //   // if the GeoJSON layer has already been created, clear it.
    //   // this allows the GeoJSON to be redrawn when the user filters it
    //   if (this.state.geojsonLayer && data){
    //     // remove the data from the geojson layer
    //     this.state.geojsonLayer.clearLayers();
    //     this.state.geojsonLayer.addData(data);
    //   } else if (!this.state.geojsonLayer) {
    //     // add our GeoJSON to the component's state and the Leaflet map
    //     this.state.geojsonLayer = L.geoJson(data, {
    //       onEachFeature: this.onEachFeature,
    //       pointToLayer: this.pointToLayer,
    //       filter: this.filter
    //     }).addTo(map);
    //   }

    //   // set our component's state with the GeoJSON data and L.geoJson layer
    //   this.setState({
    //     geojson: this.state.geojson,
    //     geojsonLayer: this.state.geojsonLayer
    //   });

    //   // fit the filtered geojson within the map's bounds
    //   this.zoomToFeature(this.state.geojsonLayer);
    // }
  },

  React.createElement(TileLayer, {
    url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
  }),

  React.createElement(
    Marker,
    { position: position },
    React.createElement(
      Popup,
      null,
      React.createElement(
        'span',
        null,
        'A pretty CSS3 popup.',
        React.createElement('br', null),
        'Easily customizable.'
      )
    )
  )
);

ReactDOM.render(map, document.getElementById('map-container'));
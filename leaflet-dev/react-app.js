var position = [21.289373, -157.917480];
var _ReactLeaflet = ReactLeaflet;
var Map = _ReactLeaflet.Map;
var TileLayer = _ReactLeaflet.TileLayer;
var Marker = _ReactLeaflet.Marker;
var Popup = _ReactLeaflet.Popup;

var map = React.createElement(
  Map,
  { center: position, zoom: 9, scrollWheelZoom: false },
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
// var CONFIG = require('config.json');

var mymap = L.map('mapid').setView([19.78706, 204.52698], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
}).addTo(mymap);

// var marker = L.marker([21.264, -157.804])
//   .addTo(mymap)
//   .bindPopup("<b>Hello Diamond Head!</b><br>I am pop.")
//   .openPopup();

// var popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at "+ e.latlng.toString())
//     .openOn(mymap);
// }

// mymap.on('click', onMapClick);

// var geojsonFeature = {
//   "type": "Feature",
//     "properties": {
//       "name": "Diamond Head",
//       "amenity": "Crater",
//       "popupContent": "A robust hike!"
//     },
//     "geometry": {
//         "type": "Polygon",
//         "coordinates": [[21.264, -157.804], [22, -158], [21.5, -159]]
//     }
// };

var geojsonDiamondHead = {
  "type": "Feature",
  "properties": {
    "style": {
      weight: 2,
      color: "#0000ff",
      opacity: 1,
      fillColor: "#B0DE5C",
      fillOpacity: 0.8
    },
  },
  "geometry": {
    "type": "MultiPolygon",
  }
};

L.geoJson(geojsonDiamondHead).addTo(mymap);
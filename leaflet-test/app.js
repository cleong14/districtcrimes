// var CONFIG = require('config.json');

var mymap = L.map('mapid').setView([21.2638, -157.8041], 13);

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

var geojsonFeature = [{
    "type": "LineString",
    "coordinates": [[21.264, -157.804], [-105, 40], [21.5, -159]]
}];

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJson(geojsonFeature, {
  style: myStyle
}).addTo(mymap);
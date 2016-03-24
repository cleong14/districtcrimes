// var CONFIG = require('config.json');

var mymap = L.map('mapid').setView([21.2638, -157.8041], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
}).addTo(mymap);

var marker = L.marker([21.264, -157.804])
  .addTo(mymap)
  .bindPopup("<b>Hello Diamond Head!</b><br>I am pop.")
  .openPopup();

function onMapClick(e) {
  alert("You clicked the map at "+ e.latlng);
}

mymap.on('click', onMapClick);
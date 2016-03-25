// var stateSenateDistrictsGeoJSON = require('Hawaii_State_Senate_Districts.geojson');

var mymap = L.map('mapid').setView([19.78706, 204.52698], 1);

var hssdStyle = {
  "color": "#FFC0CB",
  "opacity": 0.55,
  "weight": 2,
  // "fillColor": "#0000ff",
  // "fillOpacity": 0.35
};

var hshdStyle = {
  "color": "#00FF00",
  "opacity": 0.55,
  "weight": 2,
  // "fillColor": "#0000ff",
  // "fillOpacity": 0.35
};

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: config.CONSTANTS.MAPBOXKEY
}).addTo(mymap);


function clickFeature(e) {
   var district = e;
   console.log(e.target.feature.properties.objectid);
}

function onEachFeature (feature, layer) {
  layer.on({
    click: clickFeature
  });
}

var senateLayer = L.geoJson(hssd, {
  style: hssdStyle,
  onEachFeature: onEachFeature
});

var houseLayer = L.geoJson(hshd, {
  style: hshdStyle,
  onEachFeature: onEachFeature
});

$('#senate').click(function () {
  mymap.removeLayer(houseLayer);
  senateLayer.addTo(mymap);
});

$('#house').click(function () {
  mymap.removeLayer(senateLayer);
  houseLayer.addTo(mymap);
});

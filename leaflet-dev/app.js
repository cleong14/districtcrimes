// var stateSenateDistrictsGeoJSON = require('Hawaii_State_Senate_Districts.geojson');

var mymap = L.map('mapid').setView([21.289373, -157.917480], 9);

var hssdStyle = {
  "color": "#7D26CD",
  "opacity": 1,
  "weight": 1,
  "fillColor": null,
  "fillOpacity": 0.01
};

var hshdStyle = {
  "color": "#BF5FFF",
  "opacity": 1,
  "weight": 1,
  "fillColor": null,
  "fillOpacity": 0.01
};

var popup = L.popup();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: config.CONSTANTS.MAPBOXKEY
}).addTo(mymap);


function clickFeature(e) {
  var district = e;
  mymap.removeLayer(popup);
  popup
    .setLatLng(district.latlng)
    .setContent("District " + district.target.feature.properties.objectid.toString())
    .openOn(mymap);
}

function hoverFeature (e) {
  var district = e;
  console.log(district.target.feature.properties.objectid);
}

function onEachFeature (feature, layer) {
  layer.on({
    click: clickFeature,
    mouseover: hoverFeature
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

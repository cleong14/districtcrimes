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

// $('#senate').click(function () {
//   $.ajax({
//     dataType: "json",
//     url: 'http://hawaiistatewidegisopendataportal.histategis.opendata.arcgis.com/datasets/1f335d0805294adf8f3c1260ab86355a_12.geojson',
//     // data: data,
//     success: function (data) {
      L.geoJson(hssd, {
        style: hssdStyle
      }).addTo(mymap);
    // }
//   });
// });

$('#house').click(function () {
  $.ajax({
    dataType: "json",
    url: 'http://hawaiistatewidegisopendataportal.histategis.opendata.arcgis.com/datasets/32b91230f14043249c2cdb498a99a446_11.geojson',
    // data: data,
    success: function (data) {
      L.clearLayers().geoJson(data, {
        style: hshdStyle
      }).addTo(mymap);
    }
  });
});


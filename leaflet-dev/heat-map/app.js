var mymap = L.map('mapid', {
  scrollWheelZoom: false,
  zoom: 9,
  center: [21.289373, -157.917480]
})

var geojson;

geojson = L.geoJson(hssd, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(mymap);

function style (feature) {
  return {
    fillColor: getColor(feature.properties.objectid),
    "color": "#ffffff",
    "opacity": 1,
    "weight": 1,
    "fillOpacity": 0.7
  };
}

// var hshdStyle = {
//   "color": "#BF5FFF",
//   "opacity": 1,
//   "weight": 1,
//   "fillColor": null,
//   "fillOpacity": 0.01
// };

function getColor(d) {
  return d > 35  ? '#800026' :
         d > 30  ? '#BD0026' :
         d > 25  ? '#E31A1C' :
         d > 20  ? '#FC4E2A' :
         d > 15  ? '#FD8D3C' :
         d > 10  ? '#FEB24C' :
         d > 5   ? '#FED976' :
                   '#FFEDA0';
}

function highlightFeature(e) {
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
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

var popup = L.popup();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
}).addTo(mymap);

// L.geoJson(hssd, {style: style}).addTo(mymap);

// var selectedChamber = "";

// function clickFeature(e) {
//   var district = e.target;
//   mymap.removeLayer(popup);
//   popup
//     .setLatLng(e.latlng)
//     .setContent(selectedChamber + " District " + district.feature.properties.objectid.toString())
//     .openOn(mymap);
// }

// function hoverFeature (e) {
//   var district = e.target;
//   console.log(district.feature.properties.objectid);

//   district.setStyle({
//       weight: 5,
//       color: '#ffc966',
//       dashArray: '',
//       fillOpacity: 0.7
//   });

//   if (!L.Browser.ie && !L.Browser.opera) {
//     district.bringToFront();
//   }
// }

// function resetHighlight(e) {
//   var district = e.target;
//   houseLayer.resetStyle(district);
// }

// function onEachFeature (feature, layer) {
//   layer.on({
//     click: clickFeature,
//     mouseover: hoverFeature,
//     mouseout: resetHighlight
//   });
// }

// var senateLayer = L.geoJson(hssd, {
//   style: hssdStyle,
//   onEachFeature: onEachFeature
// });

// // var houseLayer = L.geoJson(hshd, {
// //   style: hshdStyle,
// //   onEachFeature: onEachFeature
// // });

// $('#senate').click(function () {
//   selectedChamber = 'senate';
//   mymap.removeLayer(houseLayer);
//   senateLayer.addTo(mymap);
// });

// $('#house').click(function () {
//   selectedChamber = 'house';
//   mymap.removeLayer(senateLayer);
//   houseLayer.addTo(mymap);
// });

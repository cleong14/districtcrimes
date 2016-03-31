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
  return d > 21  ? '#800026' :
         d > 18  ? '#BD0026' :
         d > 15  ? '#E31A1C' :
         d > 12  ? '#FC4E2A' :
         d > 9  ? '#FD8D3C' :
         d > 6  ? '#FEB24C' :
         d > 3   ? '#FED976' :
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

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);

  info.update();
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

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Hawaii House Districts</h4>' +  (props ?
        '<b>House District ' + props.objectid + '</b>'
        : 'Hover over a district!');
};

info.addTo(mymap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 3, 6, 9, 12, 15, 18, 21],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(mymap);



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

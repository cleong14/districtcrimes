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
    accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ'
}).addTo(mymap);

var selectedChamber = "";

function clickFeature(e) {
  var district = e.target;
  mymap.removeLayer(popup);
  popup
    .setLatLng(e.latlng)
    .setContent(selectedChamber + " District " + district.feature.properties.objectid.toString())
    .openOn(mymap);
}

function hoverFeature (e) {
  var district = e.target;
  console.log(district.feature.properties.objectid);

  district.setStyle({
      weight: 5,
      color: '#ffc966',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    district.bringToFront();
  }
}

function resetHighlight(e) {
  var district = e.target;
  houseLayer.resetStyle(district);
}

function onEachFeature (feature, layer) {
  layer.on({
    click: clickFeature,
    mouseover: hoverFeature,
    mouseout: resetHighlight
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
  selectedChamber = "Senate";
  mymap.removeLayer(houseLayer);
  senateLayer.addTo(mymap);
});

$('#house').click(function () {
  selectedChamber = "House";
  mymap.removeLayer(senateLayer);
  houseLayer.addTo(mymap);
});

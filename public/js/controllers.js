var myApp = angular.module('myApp', ['ui.bootstrap', 'nemLogging', 'ui-leaflet']);

myApp
  .controller('MyController', [
    '$scope',
    'CrimeService',
    function ($scope, CrimeService) {//need to add CrimeService as param
      //BUTTONS

      // define some random object and button values
      $scope.bigData = {};

      $scope.bigData.politician1 = false;
      $scope.bigData.politician2 = false;
      $scope.bigData.politician3 = false;

      // COLLAPSE
      $scope.isCollapsed = false;


      $scope.CrimeService = CrimeService;
      $scope.crimes = [];


      // //getting our crimes from the database
      CrimeService.getCrimes().then(function (response) {
        $scope.crimes = response.data;//then set the value
      });
    }
  ]);

myApp
  .controller('mapController', [
    '$scope',
    '$http',
    'leafletData',
    'leafletMapEvents',
    function ($scope, $http, leafletData, leafletMapEvents) {
      angular.extend($scope, {
        center: {
          lat: 21.4513,
          lng: -158.0153,
          zoom: 10
        },
        // center: {
        //   autoDiscover: true,
        //   zoom: 11
        // },
        defaults: {
          scrollWheelZoom: false
        },
        layers: {
          baselayers: {
            mapbox_light: {
              name: 'Mapbox Light',
              url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
              type: 'xyz',
              layerOptions: {
                apikey: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ',
                mapid: 'mapbox.light'
              }
            }
          },
          overlays: {}
        },
      });

    // $http.get('/map/hshd.geo.json').success(function(data, status) {
      angular.extend($scope.layers.overlays, {
        house: {
          name: 'Hawaii State House Districts',
          type: 'geoJSONShape',
          data: hshd,
          visible: true,
          layerOptions: {
            style: {
              "color": "#BF5FFF",
              "opacity": 1,
              "weight": 1,
              "fillColor": null,
              "fillOpacity": 0.01
            }
          }
        }
      });

      // $http.get('/map/hssd.geo.json').success(function(data, status) {
        angular.extend($scope.layers.overlays, {
          senate: {
            name: 'Hawaii State Senate Districts',
            type: 'geoJSONShape',
            data: hssd,
            visible: false,
            layerOptions: {
              style: {
                "color": "#7D26CD",
                "opacity": 1,
                "weight": 1,
                "fillColor": null,
                "fillOpacity": 0.01
              }
            }
          }
        });
      // });

      $scope.eventDetected = "No events yet...";
      var mapEvents = leafletMapEvents.getAvailableMapEvents();
      for (var k in mapEvents) {
        var eventName = 'leafletDirectiveMap.' + mapEvents[k];
        $scope.$on(eventName, function(event) {
            $scope.eventDetected = event.name;
        });
      }

    }
  ]);

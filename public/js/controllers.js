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
    function ($scope) {
      angular.extend($scope, {
        center: {
          lat: 21.289373,
          lng: -157.917480,
          zoom: 9
        },
        default: {
          scrollWheelZoom: false
        },
        layers: {
          baselayers: {
            mapboxGlLayer: {
              name: 'Sample',
              type: 'mapboxGL',
              layerOptions: {
                accessToken: 'pk.eyJ1Ijoia3doaXRlanIiLCJhIjoiY2ltNXdqdGFwMDFzanRzbTRwOW52N2syZCJ9.8tgIWcf7d9ZyJ3gjtOssaQ',
                style: 'mapbox://styles/mapbox/streets-v8'
              }
            }
          },
          overlays: {}
        },

      });
    }
  ]);
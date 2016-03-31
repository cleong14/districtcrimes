angular.module('myApp',
  ['ngRoute'],
  ['ui.bootstrap'],
  ['nemLogging', 'ui-leaflet']
);

var myApp = angular.module('myApp');

myApp
  .config(function ($routeProvider ) {

  })
  .run([
    '$rootScope',
    function ($rootScope) {
      console.log("start");

    }
  ]);
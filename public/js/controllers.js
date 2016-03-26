var myApp = angular.module('myApp', ['ui.bootstrap']);

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
        console.log(response.data[0]);
        $scope.crimes = response.data;//then set the value
      });
    }
  ])
  .directive('mapDirective', function () {
    return {
      restrict: 'E',
      controller: [
        '$scope',
        function ($scope) {
          angular.extend($scope, {
            defaults: {
              tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
              maxZoom: 14,
              path: {
                weight: 10,
                color: '#800000',
                opacity: 1
              }
            }
          });
        }
      ]
    }
  });
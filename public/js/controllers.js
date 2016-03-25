var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('MyController', [
  '$scope',
  function ($scope) {
    //BUTTONS
    
    // define some random object and button values
    $scope.bigData = {};

    $scope.bigData.politician1 = false;
    $scope.bigData.politician2 = false;
    $scope.bigData.politician3 = false;

    // COLLAPSE
    $scope.isCollapsed = false;
  }
]);
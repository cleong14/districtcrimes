var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('MyController', [
  '$scope',
  function ($scope) {
    //BUTTONS
    
    // define some random object and button values
    $scope.bigData = {};

    $scope.bigData.breakfast = false;
    $scope.bigData.lunch =false;

    // COLLAPSE
    $scope.isCollapsed = false;
  }
]);
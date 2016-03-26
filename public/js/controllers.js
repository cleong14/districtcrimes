var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('MyController', [
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
]);
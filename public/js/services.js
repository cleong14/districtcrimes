var myApp = angular.module('myApp');


myApp.service('CardService', [
  '$http',
  function ($http) {
    this.getCrimes = function () {
      return $http({ method: 'GET', url: '/api' });//getting data from the endpoint
    };
  }

]);
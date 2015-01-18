'use strict';

angular.module('metBucketApp').config(function($stateProvider) {
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  }).state('main.home', {
    url: '/home',
    views: {
      humidity: {
        templateUrl: 'app/humidity/humidity.html',
        controller: 'HumidityCtrl'
      }
    }
  });
}).run(function ($state) {
  $state.go('main.home');
});

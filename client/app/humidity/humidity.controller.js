'use strict';

angular.module('metBucketApp').controller('HumidityCtrl', function ($scope, socket) {
  socket.socket.on('humidity:save', function (humidity) {
    $scope.humidity = humidity;
  });
});

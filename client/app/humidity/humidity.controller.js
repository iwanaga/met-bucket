'use strict';

angular.module('metBucketApp').controller('HumidityCtrl', function ($scope, socket, $mdToast) {
  var series, toastVisible = false;
  socket.socket.on('humidity:save', function (humidity) {
    $scope.humidity = humidity;
    series.addPoint([
      Date.parse(humidity.createdAt) - (new Date()).getTimezoneOffset() * 60 * 1000,
      humidity.value], true, true);
    if (humidity.value < 100) {
      if (!toastVisible) {
        showSimpleToast();
        toastVisible = true;
      }
    } else {
      $mdToast.hide();
      toastVisible = false;
    }
  });

  function showSimpleToast() {
    $mdToast.show(
      $mdToast.simple()
        .content('水をあげてください！！')
        .position('top left right')
        .hideDelay(0)
    );
  }

  $scope.basicAreaChart = {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function() {
          series = this.series[0];
        }
      }
    },
    title: {
      text: 'Humidity'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    series: [{
      name: 'Humidity',
      data: (function() {
        // initial data
        var data = [],
          time = (new Date()).getTime() - (new Date()).getTimezoneOffset() * 60 * 1000,
          i;

        for (i = -19; i <= 0; i++) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      })()
    }]
  };
});

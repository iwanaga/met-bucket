'use strict';

angular.module('metBucketApp').controller('HumidityCtrl', function ($scope, socket) {
  var series;
  socket.socket.on('humidity:save', function (humidity) {
    $scope.humidity = humidity;
    series.addPoint([
      Date.parse(humidity.createdAt) - (new Date()).getTimezoneOffset() * 60 * 1000,
      humidity.value], true, true);
  });

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
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
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
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      enabled: false
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

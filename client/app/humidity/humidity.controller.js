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
      },
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#2a2a2b'],
          [1, '#3e3e40']
        ]
      },
      style: {
        fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    title: {
      text: 'Humidity',
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150,
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'

        }
      }
    },
    yAxis: {
      title: {
        text: 'Value',
        style: {
          color: '#A0A0A3'
        }
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }],
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
    },
    tooltip: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    labels: {
      style: {
        color: '#707073'
      }
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)',
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

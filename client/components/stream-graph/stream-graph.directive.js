'use strict';

angular.module('metBucketApp').directive('streamGraph', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      chartData: "=value"
    },
    transclude:true,
    replace: true,
    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height || null,
          width: attrs.width || null,
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
          plotBorderColor: '#606063',
        },
        title: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
          }
        },
        xAxis: {
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
          tickWidth: 1
        },
        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
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
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
      };

      //Update when charts data changes
      scope.$watch(function() { return scope.chartData; }, function(value) {
        if(!value) return;
        // We need deep copy in order to NOT override original chart object.
        // This allows us to override chart data member and still the keep
        // our original renderTo will be the same
        var deepCopy = true;
        var newSettings = {};
        $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
        var chart = new Highcharts.Chart(newSettings);
      });

    }
  };
});

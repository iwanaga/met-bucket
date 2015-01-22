var j5 = require('johnny-five');
var Humidity = require('./api/humidity/humidity.model');

module.exports = function (arduino) {
  arduino.on('ready', function(){
    var sensor = new j5.Sensor({
      pin : 'A0',
      freq : 1000
    });
    sensor.on('data', function(){
      var humidity = new Humidity({
        value: this.raw
      });
      humidity.save();
    });
  });
};

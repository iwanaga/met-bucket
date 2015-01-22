'use strict';

var mongoose = require('mongoose-bird')();
var timestamp = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var HumiditySchema = new Schema(
  {
    value: Number
  },
  {
    capped: {
      size: 1073741824,
      max: 1051200
    }
  }
);
HumiditySchema.plugin(timestamp);
HumiditySchema.index({createdAt: -1});

module.exports = mongoose.model('Humidity', HumiditySchema);

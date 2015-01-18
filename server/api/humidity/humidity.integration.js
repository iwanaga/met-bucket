'use strict';

var app = require('../../app');
var request = require('supertest');

var newHumidity;

describe('Humidity API:', function() {

  describe('GET /api/humidities', function() {
    var humiditys;

    beforeEach(function(done) {
      request(app)
        .get('/api/humidities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          humiditys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      humiditys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/humidities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/humidities')
        .send({
          name: 'New Humidity',
          info: 'This is the brand new humidity!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHumidity = res.body;
          done();
        });
    });

    it('should respond with the newly created humidity', function() {
      newHumidity.name.should.equal('New Humidity');
      newHumidity.info.should.equal('This is the brand new humidity!!!');
    });

  });

  describe('GET /api/humidities/:id', function() {
    var humidity;

    beforeEach(function(done) {
      request(app)
        .get('/api/humidities/' + newHumidity._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          humidity = res.body;
          done();
        });
    });

    afterEach(function() {
      humidity = {};
    });

    it('should respond with the requested humidity', function() {
      humidity.name.should.equal('New Humidity');
      humidity.info.should.equal('This is the brand new humidity!!!');
    });

  });

  describe('PUT /api/humidities/:id', function() {
    var updatedHumidity

    beforeEach(function(done) {
      request(app)
        .put('/api/humidities/' + newHumidity._id)
        .send({
          name: 'Updated Humidity',
          info: 'This is the updated humidity!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHumidity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHumidity = {};
    });

    it('should respond with the updated humidity', function() {
      updatedHumidity.name.should.equal('Updated Humidity');
      updatedHumidity.info.should.equal('This is the updated humidity!!!');
    });

  });

  describe('DELETE /api/humidities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/humidities/' + newHumidity._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when humidity does not exsist', function(done) {
      request(app)
        .delete('/api/humidities/' + newHumidity._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});

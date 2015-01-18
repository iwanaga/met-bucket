'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var humidityCtrlStub = {
  index: 'humidityCtrl.index',
  show: 'humidityCtrl.show',
  create: 'humidityCtrl.create',
  update: 'humidityCtrl.update',
  destroy: 'humidityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var humidityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './humidity.controller': humidityCtrlStub
});

describe('Humidity API Router:', function() {

  it('should return an express router instance', function() {
    humidityIndex.should.equal(routerStub);
  });

  describe('GET /api/humidities', function() {

    it('should route to humidity.controller.index', function() {
      routerStub.get
                .withArgs('/', 'humidityCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/humidities/:id', function() {

    it('should route to humidity.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'humidityCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/humidities', function() {

    it('should route to humidity.controller.create', function() {
      routerStub.post
                .withArgs('/', 'humidityCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/humidities/:id', function() {

    it('should route to humidity.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'humidityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/humidities/:id', function() {

    it('should route to humidity.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'humidityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/humidities/:id', function() {

    it('should route to humidity.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'humidityCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});

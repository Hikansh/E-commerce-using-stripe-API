const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
const assert = require('assert');

const app = require('../app');

mongoose.connect(
  'mongodb://hikansh:hikansh1998@ds239858.mlab.com:39858/sepm-project',
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      console.log('Some problem with the connection ' + err);
    } else {
      console.log('The Mongoose connection is ready');
    }
  }
);

describe('Unit testing the /home route', function () {
  it('OK, Homepage works fine', function () {
    return request(app)
      .get('/')
      .then(function (response) {
        assert.equal(response.status, 200);
      });
  });
});

describe('Unit testing the /Calculate-Price route', function () {
  it('OK, Calculate Price works fine', (done) => {
    request(app)
      .post('/calculate-price')
      .send({
        paperColor: 'red',
      })
      .then((res) => {
        expect(res).to.have.property('body');
        done();
      })
      .catch(done);
  });
});

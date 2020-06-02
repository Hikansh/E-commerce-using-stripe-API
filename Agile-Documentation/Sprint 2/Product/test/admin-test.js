const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const adminRoutes = require('../routes/admin');

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

describe('Unit testing the /Admin POST route', function () {
  it('OK, Admin Validation works fine', (done) => {
    request(app)
      .get('/admin')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(done);
  });
});

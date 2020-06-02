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

describe('Unit testing the /Admin route', function () {
  it('OK, Admin works fine', (done) => {
    request(adminRoutes)
      .get('admin/valid')
      .then((res) => {
        done();
      });
  });
});

describe('Unit testing the /Admin POST route', function () {
  it('OK, Admin Validation works fine', (done) => {
    request(app)
      .post('/admin')
      .send({
        username: 'admin',
        password: 'password',
      })
      .then((res) => {
        expect(res.statusCode).to.equal(302);
        done();
      })
      .catch(done);
  });

  it('OK, Admin Validation fails when incorrect', (done) => {
    request(app)
      .post('/admin')
      .send({
        username: 'incorrect',
        password: 'password',
      })
      .then((res) => {
        expect(res.statusCode).to.equal(403);
        done();
      })
      .catch(done);
  });
});

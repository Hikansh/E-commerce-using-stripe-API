const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const userRoutes = require('../routes/user');

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

describe('Unit testing the /User route', () => {
  it('OK, Sign up works fine', (done) => {
    request(userRoutes)
      .get('user/signup')
      .then((res) => {
        done();
      });
  });

  it('OK, Sign in works fine', (done) => {
    request(userRoutes)
      .get('user/signin')
      .then((res) => {
        done();
      });
  });

  it('OK, Profile works fine', (done) => {
    request(userRoutes)
      .get('user/profile')
      .then((res) => {
        done();
      });
  });

  it('OK, Signup Post works fine', (done) => {
    request(userRoutes)
      .post('user/signup')
      .send({
        email: 'test@mocha-2.com',
        password: 'test',
      })
      .then((res) => {
        if (res) done();
      });
  });

  it('OK, Signin Post works fine', (done) => {
    request(userRoutes)
      .post('user/signin')
      .send({
        email: 'test@mocha-2.com',
        password: 'test',
      })
      .then((res) => {
        if (res) done();
      });
  });

  it('OK, Signin Post Validation works fine', (done) => {
    request(userRoutes)
      .post('user/signin')
      .send({
        email: 'incorrect-email',
        password: 'incorrect-password',
      })
      .then((res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });
});

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Order = require('../models/order');
var Product = require('../models/product');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

const notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

//Profile
router.get('/profile', isLoggedIn, function (req, res, next) {
  Order.find({ user: req.user }, (err, orders) => {
    if (err) {
      console.log('Error');
    } else {
      const context = {
        orders: orders.map((order) => {
          return {
            id: order._id,
            product: order.product,
            paymentId: order.paymentId,
            delivery: Math.floor(Math.random() * 10) + 1,
          };
        }),
      };
      res.render('user/profile', {
        orders: context.orders,
      });
    }
  });
});

//Logout
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

// SignUp page
router.get('/signup', function (req, res, next) {
  var msgs = req.flash('error');
  res.render('user/signup', {
    messages: msgs,
    hasErrors: msgs.length > 0,
  });
});

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true,
  })
);

//Sign In
router.get('/signin', function (req, res, next) {
  var msgs = req.flash('error');
  res.render('user/signin', {
    messages: msgs,
    hasErrors: msgs.length > 0,
  });
});

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true,
  })
);

module.exports = router;

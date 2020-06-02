var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_7HqyyxTZ0XdOj0dVxfdD7Tcx');
var Order = require('../models/order');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Admin Login
router.get('/admin', (req, res, next) => {
  res.render('admin/signin');
});

router.post('/admin', (req, res) => {
  const ADMIN = {
    username: 'admin',
    password: 'password',
  };
  if (
    req.body.username === ADMIN.username &&
    req.body.password === ADMIN.password
  ) {
    res.status(302);
    res.redirect('/admin/valid');
  } else {
    res.status(403);
    res.render('admin/signin', {
      messages: 'Invalid Creds !',
      hasErrors: true,
    });
  }
});

// Calculate the price
router.post('/calculate-price', (req, res, next) => {
  let price = 50;
  const request = req.body;
  if (request.paperColor === 'red') {
    price += 20;
  }
  if (request.paperColor === 'green') {
    price += 10;
  }
  if (request.paperColor === 'blue') {
    price += 30;
  }
  if (request.themeColor === 'dark') {
    price += 50;
  }
  if (request.themeColor === 'light') {
    price += 30;
  }
  if (request.paperType === 'plain') {
    price += 10;
  }
  if (request.paperType === 'lined') {
    price += 20;
  }
  if (request.paperType === 'dotted') {
    price += 30;
  }
  if (request.delivery === 'standard') {
    price += 0;
  }
  if (request.delivery === 'express') {
    price += 20;
  }
  if (request.coverText.length != 0) {
    price += 50;
  }
  res.render('index', {
    price: price,
    price2: price * 100,
    hasPrice: price > 50,
    paperColor: request.paperColor ? request.paperColor : 'No selection',
    themeColor: request.themeColor ? request.themeColor : 'No selection',
    paperType: request.paperType ? request.paperType : 'No selection',
    coverText: request.coverText ? request.coverText : 'No selection',
    delivery: request.delivery ? request.delivery : 'Standard Delivery',
  });
});

router.post('/buy-diary', async (req, res, next) => {
  //Stripe
  console.log(req.body.price);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: req.body.price,
        description: 'Test Diary Sale',
        currency: 'aud',
        customer: customer.id,
      })
    )
    .then((charge) => {
      let product = new Product({
        paperColor: req.body.paperColor,
        theme: req.body.themeColor,
        paperType: req.body.paperType,
        text: req.body.coverText,
        price: req.body.price,
      });
      product.save();
      let order = new Order({
        user: req.user,
        product: product._id,
        paymentId: charge.id,
        delivery: req.body.delivery ? req.body.delivery : 'standard',
      });
      order.save((err, result) => {
        if (err) {
          console.log('Error saving Order');
        } else {
          res.render('success');
        }
      });
    });
});
module.exports = router;

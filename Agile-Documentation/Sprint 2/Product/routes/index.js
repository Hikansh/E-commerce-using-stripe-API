var express = require('express');
var router = express.Router();
var stripe = require('stripe')('sk_test_7HqyyxTZ0XdOj0dVxfdD7Tcx');
var Order = require('../models/order');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Calculate the price
router.post('/calculate-price', (req, res, next) => {
  let price = 10;
  const request = req.body;
  if (request.paperColor === 'red') {
    price += 2;
  }
  if (request.paperColor === 'green') {
    price += 1;
  }
  if (request.paperColor === 'blue') {
    price += 3;
  }
  if (request.themeColor === 'dark') {
    price += 5;
  }
  if (request.themeColor === 'light') {
    price += 3;
  }
  if (request.paperType === 'plain') {
    price += 1;
  }
  if (request.paperType === 'lined') {
    price += 2;
  }
  if (request.paperType === 'dotted') {
    price += 3;
  }
  if (request.coverText.length != 0) {
    price += 5;
  }
  res.render('index', {
    price: price,
    price2: price * 100,
    hasPrice: price > 10,
    paperColor: request.paperColor ? request.paperColor : 'No selection',
    themeColor: request.themeColor ? request.themeColor : 'No selection',
    paperType: request.paperType ? request.paperType : 'No selection',
    coverText: request.coverText ? request.coverText : 'No selection',
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

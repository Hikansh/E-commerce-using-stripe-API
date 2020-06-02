const express = require('express');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const session = require('express-session');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [User, Order, Product],
  rootPath: '/admin/valid',
  branding: {
    companyName: 'Diary-Sale Web APP',
    softwareBrothers: false,
  },
});

const router = AdminBroExpress.buildRouter(adminBro);

// const ADMIN = {
//   email: 'test@example.com',
//   password: 'password',
// };

// let router = express.Router();
// router.get('/', (req, res) => {
//   res.render('admin/signin');
// });
// router.post('/', (req, res) => {
//   if (req.body.email === ADMIN.email && req.body.password === ADMIN.password) {
//     session.admin = true;
//   } else {
//     res.render('admin/signin', {
//       messages: 'Invalid Creds',
//       hasErrors: true,
//     });
//   }
// });

module.exports = router;

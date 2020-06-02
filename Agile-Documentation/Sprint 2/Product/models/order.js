var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);

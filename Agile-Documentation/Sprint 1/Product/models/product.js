var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  paperColor: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  paperType: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', Schema);

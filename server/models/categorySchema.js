const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
   // default: //default picture
  },
});

module.exports = mongoose.model('category', categorySchema, 'categories');

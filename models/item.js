'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  picurl: String,
  isAvailable: Boolean
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;

'use strict';

var mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
  asker: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  askee: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: {type: String},
  askeritem: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  askeeitem: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
});

var Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

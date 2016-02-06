'use strict';

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
  name: String,
  description: String,
  pictures: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'
}],
  shared: Boolean
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;

'use strict';

var mongoose = require('mongoose');
var AWS = require("aws-sdk");
var uuid = require("node-uuid");

var s3 = new AWS.S3();

var itemSchema = new mongoose.Schema({
  name: String,
  picurl: String
});


var Item = mongoose.model('Item', itemSchema);

Item.upload = function(file, cb) {
  var match = file.originalname.match(/\.\w+$/)[0];
  var ext = match ? match[0] : '';
  var key = uuid.v1() + ext;
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key, // name of file on s3
    Body: file.buffer // content of file
  };

  s3.putObject(params, function(err, data) { // uploads to s3
    console.log("AWS_URL", process.env.AWS_URL);
    console.log("AWS_BUCKET", process.env.AWS_BUCKET);
    console.log("key", key);
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + "/" + key; //refers to file on s3;
    var image = new Item({
      name: file.originalname,
      picurl: url
    });

    image.save(function(err, image) {
      console.log("url:", url);
      cb(err, image)
    });
  });
}

module.exports = Item;

'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var Trade = require('../models/trade');
var authMiddleware = require('../config/auth');
router.use(authMiddleware);

router.post('/', function(req, res) {
  var trade = new Trade(req.body);
  console.log(trade);
  trade.asker = req.user._id;
  User.findOne({inventory: req.body.askeeitem}).exec(function(err, user){
    if(err) console.log('asda',err);
    console.log('user',user);
    trade.askee = user._id;
    trade.save(function(err, saveditem) {
      console.log('errsavinguser:', err);
      console.log('saveduser:', saveditem);
      res.send(saveditem);
    });
  });
});

module.exports = router;

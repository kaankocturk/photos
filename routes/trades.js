'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var Trade = require('../models/trade');
var async = require('async');
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

router.get('/my', function(req, res, next) {
  User.findOne({uid: req.user.uid}).exec(function(err, user){
    if(err) console.log('asda',err);
    var outgoing, incoming;
    async.parallel([
      function(cb){
        Trade.find({asker: user._id}).populate('askee askeeitem askeritem').exec(function(err, trades){
          if(err) console.log('asda',err);
          console.log('trade',trades);
          cb(null, trades)
        });
      },
      function(cb){
        Trade.find({askee: user._id}).populate('asker askeeitem askeritem').exec(function(err, trades){
          if(err) console.log('asda',err);
          console.log('trade',trades);
          cb(null,trades)
        });
      }
      ],function(err, results){
      console.log(results);
        res.send(results);
    });
  });
});

router.put('/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Trade.update({_id: req.params.id}, {$set : {status: req.body.status}}, function(err){
    res.send('ok');
  });
});

router.put('/complete/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Trade.update({_id: req.params.id}, {$set : {status: req.body.status}}, function(err){
    console.log(err);
  });
  Trade.findOne({_id: req.params.id}).exec(function(err, trade){
    console.log(trade);
    User.findOne({_id: trade.askee}).exec(function(err, user){
      if(err) console.log('asda',err);
      console.log('user',user);
      var askeeitem= user.inventory.splice(user.inventory.indexOf(trade.askeeitem),1)[0];
      var askeritem;
      User.findOne({_id: trade.asker}).exec(function(err, user2){
        askeritem= user2.inventory.splice(user2.inventory.indexOf(trade.askeritem),1,askeeitem)[0];
        user2.save(function(err, saveditem) {
          console.log('errsavinguser:', err);
          console.log('saveduser:', saveditem);
        });
        user.inventory.push(askeritem);
        user.save(function(err, saveditem) {
          console.log('errsavinguser:', err);
          console.log('saveduser:', saveditem);
        });
      });
    });
    Trade.update({askeeitem: trade.askeeitem, status: 'pending'}, {$set : {status: 'declined'}}).exec(function(err){
      if(err) console.log('2usersremove',err);
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Trade.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      res.send('success!');
    }
  });
  });

module.exports = router;

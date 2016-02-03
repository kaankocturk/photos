'use strict';

var express = require('express');
var router = express.Router();
var authMiddleware = require('../config/auth');
router.use(authMiddleware);

var Item = require('../models/item');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Item.find({}, function(err, items) {
    console.log('errgettingitems:', err);
    console.log('items:', items);
    res.send(items);
  });
});

router.post('/', function(req, res) {
  var item = new Item(req.body);
  console.log('item:', item);
  item.save(function(err, saveditem) {
    User.findOne({uid: req.user.uid}, function(err, user){
      user.inventory.push(saveditem._id);
    user.save(function(err, saveditem) {
      console.log('errsavinguser:', err);
      console.log('saveduser:', saveditem);
    });
  });
  console.log('errsavingitem:', err);
  console.log('saveditem:', saveditem);
  res.send(saveditem);
});
});

router.get('/my', function(req, res, next) {
  User.findOne({uid: req.user.uid}).populate('inventory').exec(function(err, user){
    if(err) console.log('asda',err);
    console.log('39',user);
    res.send(user.inventory);
  });
});

router.delete('/:id', function(req, res, next) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      User.findOne({uid: req.user.uid}).exec(function(err, user){
        console.log(user.inventory);
        user.inventory.splice(user.inventory.indexOf(req.params.id),1);
        user.save(function(err, saveditem) {
          console.log('errsavinguser:', err);
          console.log('saveduser:', saveditem);
        });
      });
      console.log('removed!');
      res.send('success!');
    }
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    console.log('item is:'+item);
    res.render('item', item);
  });
});

router.put('/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Item.update({_id: req.params.id}, {$set : req.body}, function(err){
    res.send('ok');
  });

});

module.exports = router;

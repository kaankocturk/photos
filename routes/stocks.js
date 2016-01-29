var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/user');
var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('stocks');
});

router.get('/all', function(req, res, next) {
  User.findOne({uid: req.user.uid}, function(err, user){
    res.send(user.portfolio);
  });
});

router.post('/quote', function(req,res,next){
  var send;
  request('http://dev.markitondemand.com/Api/v2/Quote/json?symbol='+req.body.sym, function(err, resa, body) {
    console.log('err:', err);
    console.log('bodyquote:', JSON.parse(body));
    send = JSON.parse(body);
    res.send(send);
  });
});

router.delete('/:sym', function(req, res, next) {
  User.findOne({uid: req.user.uid}, function(err, user){
    var newportfolio = user.portfolio;
    for(var i = 0; i<newportfolio.length; i++){
      if(newportfolio[i].symbol===req.params.sym){
        newportfolio.splice(i,1);
      }
    }
    user.portfolio = newportfolio;
    user.save(function(err, saveditem) {
    console.log('errsavingitem:', err);
    console.log('saveditem:', saveditem);
    res.send(saveditem);
  });
  });
});

router.post('/search', function(req,res,next){
  var send;
  request('http://dev.markitondemand.com/Api/v2/Lookup/json?input='+req.body.ext , function(err, resa, body) {
    console.log('err:', err);
    console.log('body:', JSON.parse(body));
    send = JSON.parse(body);
    res.send(send);
  });
  console.log(send);
});

router.post('/', function(req, res) {
  var item = (req.body);
  User.findOne({uid: req.user.uid}, function(err, user){
    user.portfolio.push(item);
    user.save(function(err, saveditem) {
    console.log('errsavingitem:', err);
    console.log('saveditem:', saveditem);
    res.send(saveditem);
  });
  });
});

module.exports = router;

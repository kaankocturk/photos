var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var itemObj;

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "The app you need" });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/changepw', function(req, res, next) {
  res.render('changepw');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/dashboard', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.render('dashboard');
});

router.get('/itemform', function(req, res) {
  res.render('itemForm');
});

router.get('/albumForm', function(req, res) {
  res.render('albumForm');
});

router.get('/community', function(req, res) {
  res.render('community');
});

module.exports = router;

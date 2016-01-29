var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Kaan's App" });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/profile', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.render('profile');
});

module.exports = router;

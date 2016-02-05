'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');

var ref = new Firebase('https://sharealbums.firebaseio.com/');

router.post('/register', function(req, res, next) {
  console.log('body',req.body);
  ref.createUser(req.body, function(err, userData) {
    console.log(userData);
    if(err) return res.status(400).send(err);
    User.create(userData, function(err) {
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
  ref.authWithPassword(req.body, function(err, authData) {
    console.log('authdata',authData);
    if(err) return res.status(400).send(err);
    User.findOne({uid: authData.uid}, function(err, user) {
      console.log('erruser',err);
      console.log('user',user);
      var token = user.generateToken();
      res.cookie('mytoken', token).send();
    });
  });
});

router.get('/profile', authMiddleware, function(req, res) {
  User.findById(req.user._id, function(err, user) {
    res.send(user);
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('mytoken').redirect('/');
});

router.post('/reset', function(req, res, next) {
  ref.resetPassword(req.body, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error resetting password:", error);
      }
    } else {
      res.send('success!');
      console.log("Password reset email sent successfully!");
    }
  });
});

router.post('/changepw', function(req, res, next) {
  ref.changePassword(req.body, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_PASSWORD":
          console.log("The specified user account password is incorrect.");
          break;
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error changing password:", error);
      }
    } else {
      res.send('success!');
      console.log("User password changed successfully!");
    }
  });
});

module.exports = router;

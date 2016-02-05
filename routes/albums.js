'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var Album = require('../models/album');
var async = require('async');
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage()});
var authMiddleware = require('../config/auth');
router.use(authMiddleware);

router.post('/', function(req, res) {
  console.log(req.body);
  var album = new Album(req.body);
  console.log('album:', album);
  album.save(function(err, savedalbum) {
    User.findOne({uid: req.user.uid}, function(err, user){
      user.albums.push(savedalbum._id);
    user.save(function(err, savedalbum) {
      console.log('errsavinguser:', err);
      console.log('saveduser:', savedalbum);
    });
  });
  console.log('errsavingalbum:', err);
  console.log('savedalbum:', savedalbum);
  res.send(savedalbum);
});
});

router.post('/:id', upload.array("images"), function(req, res, next) {
  console.log("req.files:", req.files);
  console.log('id', req.params.id);
  Item.upload(req.files[0], function(err, image) {
    console.log('image', image);
    Album.findById(req.params.id, function(err, album){
      album.pictures.push(image._id);
      album.save(function(err,savedalbum){
        console.log('errsavingalbum:', err);
        console.log('savedalbum:', savedalbum);
        res.render('album', album);
      });
    });
  });
});

router.get('/my', function(req, res, next) {
  User.findOne({uid: req.user.uid}).populate('albums').exec(function(err, user){
    if(err) console.log('asda',err);
    console.log('39',user);
    res.send(user.albums);
  });
});

router.put('/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Album.update({_id: req.params.id}, {$set : req.body}, function(err){
    res.send('ok');
  });

});

router.get('/images/:id', function(req, res, next) {
  console.log(req.params.id);
  Album.findById(req.params.id).populate('pictures').exec(function(err, album){
    if(err) console.log('asda',err);
    res.send(album.pictures);
  });
});


router.delete('/:id', function(req, res, next) {
  Album.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      User.findOne({uid: req.user.uid}).exec(function(err, user){
        console.log(user.albums);
        user.albums.splice(user.albums.indexOf(req.params.id),1);
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
  Album.findById(req.params.id, function(err, album) {
    console.log('item is:'+album);
    res.render('album', album);
  });
});
//
// router.put('/complete/:id', function(req,res){
//   console.log(req.params.id);
//   console.log(req.body);
//   Trade.update({_id: req.params.id}, {$set : {status: req.body.status}}, function(err){
//     console.log(err);
//   });
//   Trade.findOne({_id: req.params.id}).exec(function(err, trade){
//     console.log(trade);
//     User.findOne({_id: trade.askee}).exec(function(err, user){
//       if(err) console.log('asda',err);
//       console.log('user',user);
//       var askeeitem= user.albums.splice(user.albums.indexOf(trade.askeeitem),1)[0];
//       var askeritem;
//       User.findOne({_id: trade.asker}).exec(function(err, user2){
//         askeritem= user2.albums.splice(user2.albums.indexOf(trade.askeritem),1,askeeitem)[0];
//         user2.save(function(err, saveditem) {
//           console.log('errsavinguser:', err);
//           console.log('saveduser:', saveditem);
//         });
//         user.albums.push(askeritem);
//         user.save(function(err, saveditem) {
//           console.log('errsavinguser:', err);
//           console.log('saveduser:', saveditem);
//         });
//       });
//     });
//     Trade.update({askeeitem: trade.askeeitem, status: 'pending'}, {$set : {status: 'declined'}}).exec(function(err){
//       if(err) console.log('2usersremove',err);
//     });
//   });
// });
//
// router.delete('/:id', function(req, res, next) {
//   Trade.remove({_id: req.params.id}, function(err) {
//     if (err) {
//       console.log('cant remove!');
//       res.status(400).send(err);
//     } else {
//       res.send('success!');
//     }
//   });
//   });

module.exports = router;

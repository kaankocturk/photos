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

router.get('/', function(req, res, next) { //community page
  Album.find({}).populate('pictures').exec(function(err, albums) {
    var newarr=[];
    User.findOne({uid: req.user.uid}, function(err, user){
      for(var i=0; i<albums.length; i++){
        if(user.albums.indexOf(albums[i]._id)===-1 && albums[i].shared){
          console.log('if');
          console.log(user.albums.indexOf(albums[i]._id));
          newarr.push(albums[i]);
        }
      }
      console.log(newarr);
      res.send(newarr);
    });
  });
});

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

router.put('/share/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Album.update({_id: req.params.id}, {$set : {shared: req.body.shared}}, function(err){
    console.log(err);
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

module.exports = router;

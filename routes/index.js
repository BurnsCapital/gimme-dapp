var express = require('express');
var router = express.Router();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var Data = require('../db');
var url = 'mongodb://localhost:27017/gimmeDappDB';

//get home page

router.get('/', ensureAuthenticated, function(req, res){
  res.render('index');
});

router.get('/submit', function(req, res){
  res.render('submit');
});

router.get('/about',function(req,res){
  res.render('about');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
  req.flash('error_msg', '');
  res.redirect('/users/login');
  }
};
//get data from db for grids
router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
      assert.equal(null, err);
    var cursor = Data.find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/submit',function(req,res,next){
  var newDapp = {
    owner : req.body.user,
    dappname : req.body.title,
    devteam : req.body.title,
    shortdesc : req.body.title,
    donateaddr : req.body.title,
    dappwebsite : req.body.title,
    statusx : req.body.title,
    category : req.body.title,
    releasedate : req.body.title

  };

  var data = new Data(newDapp);
  data.save();

  res.redirect('/');
});

router.post('/update',function(req,res,next){
  var id = req.body.id;

  Data.findById(id, function(err,doc){
    if(err) throw err;
    doc.dappname = req.body.title,
    doc.devteam = req.body.title,
    doc.shortdesc = req.body.title,
    doc.donateaddr = req.body.title,
    doc.dappwebsite = req.body.title,
    doc.statusx = req.body.title,
    doc.category = req.body.title,
    doc.releasedate = req.body.title
  })
res.redirect('/');
});


router.post('/delete',function(req,res,next){
  var id = req.body.id;
  Data.findByIdAndRemove(id).exec();
res.redirect('/');
});



module.exports = router;

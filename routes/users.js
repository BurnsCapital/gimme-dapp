var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../db');
//get home page

router.get('/register', function(req,res){
  res.render('register');
});

router.get('/login', function(req,res){
  res.render('login');
});


//reg a new user
router.post('/register', function(req,res){
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //validation
  req.checkBody('username', 'Userame is required').notEmpty();
  req.checkBody('email', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors){
    res.render('register',{
      errors:errors
    });
  } else {
    var newUser = new User({
      username: username,
      password: password,
      email: email
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });
    req.flash('success_msg', 'You are registered!');
    res.redirect('/users/login');
  }});

//login stuff
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function( err, user){
      if (err) throw err;
      if(!user){
          return done (null,false,{message: 'Unkown User'});
      }

    User.comparePassword(password, user.password, function(err, isMatch){
          if (err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

router.post('/login',
  passport.authenticate('local',{successRedirect:'/', failureRedirect:'/users/login', faliureFlash: true}),
  function(req, res) {
    res. redirect('/');

  });

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out!');
  res.redirect('/users/login');
}
)

//user profile management
router.get('/dashboard', function(req,res){
  res.render('dashboard');
});

router.post('/update',function(req,res,next){
  var id = req.body.id;

  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //validation
  req.checkBody('username', 'Userame is required').notEmpty();
  req.checkBody('email', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors){
    res.render('register',{
      errors:errors
    });
  } else {
    var newUser = new User({
      username: username,
      password: password,
      email: email
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });
    req.flash('success_msg', 'Your account has been updated!');
    res.redirect('/user/dashboard');
  }});



module.exports = router;

// #!/usr/bin/env node

require( './db' );

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var LocalStrategy = require('passport-local').Strategy;
var db = mongoose.conection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

//bofy parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//secret stuff
app.use(session({
  secret:"putsecrethereafteryouclone",
  resave:false,
  saveUninitialized:true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//expressValidator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//Global validationErrors
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// app libraries
global.__lib = __dirname + '/lib/';

app.use('/',routes);
app.use('/users',users);


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

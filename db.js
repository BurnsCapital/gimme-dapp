var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var bcrypt = require('bcryptjs');
  SALT_WORK_FACTOR = 10;


//store the dap data
var devDapp = new Schema(
{
    //basic info
    "number": {type: Number, index: {unique: true}},
    "owner":String,
    "dappName": String,
    "devTeam": String,
    "shortDes": String,
    "donateAddr": String,
    "dappWebsite": String,
    "statusx": String,
    "category": String,
    "releaseDate": String,
    //social media - if is null then no icon later
    "github": String,
    "linkedin": String,
    "reddit": String,
    "rss": String,
    "skype": String,
    "twitter": String,
    "youtube": String,
  //store social rating
    "upvoteCount": Number,
    "downvoteCount": Number
});

var userSchema = new mongoose.Schema({
    "username": {type: String, unique: true},
    "password": {type: String},
    "email": String,
    "type": String
});


mongoose.model('devDapp', devDapp);
mongoose.model('User', userSchema);
 module.exports = mongoose.model('devDapp');
var User = module.exports = mongoose.model('User');


//user account stuff
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newUser.password,salt,function(err,hash){
          newUser.password = hash;
          newUser.save(callback);
      });
    });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword, hash,callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}



mongoose.connect( 'mongodb://localhost/gimmeDappDB' );
mongoose.set('debug', true);

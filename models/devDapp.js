var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;


//store the dap data
var devDapp = new Schema(
{
    //basic info
    "number": {type: Number, index: {unique: true}},
    "owner":String,
    "logoImage": String,
    "dappName": String,
    "devTeam": String,
    "shortDes": String,
    "longAbout": String,
    "donateAddr": String,
    "acctType": String,
    "dappWebsite": String,
    "statusx": String,
    "category": String,
    "platforms": String,
    "releaseDate": String,
    //social media of dapp - if is null then no icon later
    "github": String,
    "linkedin": String,
    "reddit": String,
    "rss": String,
    "skype": String,
    "twitter": String,
    "youtube": String,
  //store social rating
    "userrating" :{
      "userID" : { type : String},
      "uniqueRating" :{ type : Number}
    }
});


mongoose.model('devDapp', devDapp);
module.exports = mongoose.model('devDapp');

mongoose.connect( 'mongodb://localhost/gimmeDappDB' );
mongoose.set('debug', true);

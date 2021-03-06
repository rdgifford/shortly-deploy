var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

db.urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this['url']);
  this.code = shasum.digest('hex').slice(0, 5);
  this.visits = this.visits || 0;
  next();
});

var Link = mongoose.model('Link', db.urlSchema);

module.exports = Link;

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  google: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
});

user.set('toJSON', { getters: true, virtuals: true });
user.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  let that = this;
  return this.findOne({
    'google.id': profile.id
  }, function(err, user) {
    if(!user) {
      let newUser = new that({
        google: {
          id: profile.id,
          token: accessToken
        }
      });
      newUser.save(function(error, savedUser) {
        if(error)
          console.log(error);
        return cb(error, savedUser);
      });
    } else
      return cb(err, user);
  })
};

module.exports = mongoose.model('User', user);

'use strict';

const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const authConfig = require('./auth.js');
const Users = require('../models/user.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  })
});

passport.use(new GoogleTokenStrategy({
    clientID: authConfig.googleAuth.clientID,
    clientSecret: authConfig.googleAuth.clientSecret
  },
  function (accessToken, refreshToken, profile, done) {
    Users.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
      return done(err, user);
    });
}));

module.exports = passport;

'use strict';

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
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

passport.use(new TwitterStrategy({
    consumerKey: authConfig.twitterAuth.consumerKey,
    consumerSecret: authConfig.twitterAuth.consumerSecret,
    callbackURL: authConfig.twitterAuth.callbackURL
  },
  (token, refreshToken, profile, done) => {
      process.nextTick(() => {
        Users.findOne({ 'twitter.id': profile.id }, (err, user) => {
          if(err)
            return done(err);
          if(user)
            return done(null, user);
          else {
            let newUser = new Users();
            console.log("profile keys:", Object.keys(profile));
            newUser.twitter.id = profile.id;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;
            newUser.save(err => {
              if(err)
                return done(err);
              return done(null, newUser);
            })
          }
        })
      })
    }
  )
);

module.exports = passport;

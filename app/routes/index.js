'use strict';

const express = require('express');
const router = express.Router();
const searchVenues = require('../api/searchVenues.js');
const goingPeople = require('../api/goingPeople.js');

module.exports = (passport) => {
  function isLoggedIn (req, res, next) {
    if(req.isAuthenticated())
      return next();
    else
      res.redirect("http://127.0.0.1:3000");
  }

  // health check
  router.get('/health-check', (req, res) => {
    console.log("health check");
    console.log(req.sessionID);
    res.json("Server is up!");
  });

  // search venues
  router.post('/api/search', searchVenues);

  // post goingPeople
  router.post('/api/goingPeople', isLoggedIn, goingPeople.addGoingPeople);

  // send user info if user is logged in
  router.get('/isAuthenticated', (req, res) => {
    console.log(req.isAuthenticated());
    console.log(req.user);
    console.log(req.session);
    console.log(req.sessionID);
    res.json({ isAuthenticated: req.isAuthenticated() })
  });

  // twitter auth
  router.get('/auth/twitter', passport.authenticate('twitter'));

  // twitter auth callback
  router.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
    console.log("inside callback");
    console.log(req.connection.remoteAddress);
    console.log(req.user);
    console.log(req.session);
    console.log(req.sessionID);
    res.redirect("http://127.0.0.1:3000");
    // res.redirect('/');
  });

  return router;
};


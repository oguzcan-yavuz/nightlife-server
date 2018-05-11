'use strict';

const express = require('express');
const router = express.Router();
const searchVenues = require('../api/searchVenues.js');
const goingPeople = require('../api/goingPeople.js');

module.exports = (passport) => {
  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated())
      return next();
  }

  // health check
  router.get('/health-check', (req, res) => {
    res.json("Server is up!");
  });

  // search venues
  router.post('/api/search', searchVenues);

  // post goingPeople
  router.post('/api/goingPeople', isLoggedIn, goingPeople.addGoingPeople);

  // twitter auth
  router.get('/auth/twitter', passport.authenticate('twitter'));

  // TODO: twitter auth callback

  return router;
};


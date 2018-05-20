'use strict';

const express = require('express');
const router = express.Router();
const { generateToken, sendToken } = require('../utils/token.utils.js');
const searchVenues = require('../api/searchVenues.js');
const goingPeople = require('../api/goingPeople.js');

module.exports = (passport) => {
  // health check
  router.get('/health-check', (req, res) => {
    res.json("Server is up!");
  });

  // search venues
  router.post('/api/search', searchVenues);

  // get the last search location
  router.get('/lastSession', (req, res) => {
    res.json({ session: req.session });
  });

  // post goingPeople
  router.post('/api/goingPeople', goingPeople.updateGoingPeople);

  // google oauth
  router.post('/auth/google', passport.authenticate('google-token', { session: true }), (req, res, next) => {
      if (!req.user)
        return res.send(401, 'User Not Authenticated');
      req.auth = {
        id: req.user.id
      };
      next();
    },
    generateToken, sendToken
  );

  return router;
};


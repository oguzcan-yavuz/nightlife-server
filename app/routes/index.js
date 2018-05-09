const express = require('express');
const router = express.Router();
const search = require('../api/search.js');

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({ error: "Unauthorized user"});
  }
}

// home router
router.get('/api/search', search);

module.exports = router;

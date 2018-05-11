'use strict';

const session = require('express-session');

module.exports = session({
  secret: 'nightlife app',
  resave: false,
  saveUninitialized: true
});

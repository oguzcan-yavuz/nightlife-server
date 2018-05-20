'use strict';

const session = require('express-session');
const FileStore = require('session-file-store')(session);

module.exports = session({
  store: new FileStore(),
  secret: 'nightlife app',
  resave: false,
  saveUninitialized: true
});

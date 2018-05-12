'use strict';

const session = require('express-session');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);

module.exports = session({
  genid: (req) => {
    console.log("session middleware");
    console.log(req.sessionID);
    return uuid();
  },
  store: new FileStore(),
  secret: 'nightlife app',
  resave: false,
  saveUninitialized: true
});

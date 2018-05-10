'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');   // dev only
require(path.join(__dirname, 'app', 'config', 'db.js'))();    // create db connection
// const session = require('./app/config/session');
// const passport = require('./app/config/passport.js');
const router = require(path.join(__dirname, 'app', 'routes', 'index.js'));
const PORT = process.env.PORT || 8080;
let app = express();

app.use(cors({ credentials: true, origin: true }));   // dev only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session);
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(router(passport));
app.use(router);
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
// require('./app/config/db.js').connectDB();   // create db connection
// const session = require('./app/config/session');
// const passport = require('./app/config/passport.js');
// const router = require('./app/routes/index.js');
const router = require(path.join(__dirname, 'app', 'routes', 'index.js'));
const PORT = process.env.PORT || 8080;
let app = express();

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

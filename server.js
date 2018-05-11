'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require(path.join(__dirname, 'app', 'config', 'session.js'));
const passport = require(path.join(__dirname, 'app', 'config', 'passport.js'));
const router = require(path.join(__dirname, 'app', 'routes', 'index.js'));
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;
let app = express();

mongoose.connect(MONGO_URI);

const corsOptions = {
  credentials: true,
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router(passport));
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

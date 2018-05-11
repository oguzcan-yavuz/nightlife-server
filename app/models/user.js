'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  twitter: {
    id: String,
    username: String,
    displayName: String
  }
});

module.exports = mongoose.model('User', user);

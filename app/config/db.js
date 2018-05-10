const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

module.exports = () => {
  mongoose.Promsie = global.Promise;
  mongoose.connect(MONGO_URI);
};

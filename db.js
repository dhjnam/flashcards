require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/flash`).then(() => {
  console.log('  || Mongoose connection established ||');
});

module.exports = mongoose
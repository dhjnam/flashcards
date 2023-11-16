require('dotenv').config();
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/flash`);

module.exports = mongoose
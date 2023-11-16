require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const { version } = require('./package.json')
const V = version.split('.')[0];
const PORT = process.env.PORT;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const NODE_ENV = process.env.NODE_ENV || 'dev';

const mongoose = require('./db');

const express = require('express');
const indexRouter = require('./routes/index');
const flashcardsRouter = require('./routes/flashcards');
const usersRouter = require('./routes/users');
const swaggerDocs = require('./utils/swagger');


const api = express();

api.use(`/api/v${V}/index`, indexRouter);
api.use(`/api/v${V}/flashcards`, flashcardsRouter);
api.use(`/api/v${V}/users`, usersRouter);


if (NODE_ENV === 'test') {
  const server = api.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
  });
  module.exports = { server, api, mongoose };
} else {
  api.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
    swaggerDocs(api);
  });
  
}


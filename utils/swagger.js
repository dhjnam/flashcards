require('dotenv').config();
const { version } = require('../package.json');
const HOST = process.env.HOST
const PORT = process.env.PORT
const V = version.split('.')[0]

const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const openapiSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "flashcards - OpenAPI 3.0",
      description: "Simple flashcard api",
      version
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}/api/v${V}`
      }
    ]
  },
  apis: [
    "./routes/*.js",
    "./schemas/*.schema.js"
  ]
});

module.exports = function swaggerDocs(api) {
  api.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

  console.log(`Docs available at http://${HOST}:${PORT}/api/v${V}/docs`)
}

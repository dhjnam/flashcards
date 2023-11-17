require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const flashcardsTest = require('./routes/flashcards.test.js')

describe('TEST API', function() {
  describe('GET /flashcards/{flashcardId}', flashcardsTest);
});

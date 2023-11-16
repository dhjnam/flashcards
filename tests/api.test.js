require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const flashcardsTest = require('./routes/flashcards.test.js')

describe('TEST API', function() {
  
  before(function() {
    const { server } = require('../api')
    this.server = server;
  });
  
  after(function(done) {
    this.server.close(function() {
      done();
    });
  });

  describe('GET /flashcards/{flashcardId}', flashcardsTest);
});

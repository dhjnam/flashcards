require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;
const { version } = require('../../package.json');
const V = version.split('.')[0];

const PORT = process.env.PORT;
const HOST = process.env.HOST;


chai.use(chaiHttp);

describe('GET /flashcards/{flashcardId}', function() {
  
  const { api, server, mongoose } = require('../../api');
  this.ctx.server = server
  this.ctx.mongoose = mongoose

  after(function() {
    this.server.close()
    this.mongoose.connection.close()
  })
  
  it('it returns 200 with correct body', function(done) {
    const id = 70
    chai.request(this.server)
      .get(`/api/v${V}/flashcards/${id}`)
      .end(function(err, res) {
        should.not.exist(err)
        const flashcard = res.body;
        res.should.be.json;
        res.should.have.status(200);
        flashcard.should.have.all.keys('front', 'back', 'id', '_id');
        flashcard.id.should.be.equal(id)
        flashcard._id.should.match(/^[a-z0-9]{24}$/);
        flashcard.front.should.be.a('string');
        flashcard.back.should.be.a('string');
        flashcard.id.should.be.a('number');
        done();
      });
  });

});
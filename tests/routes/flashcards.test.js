require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { version } = require('../../package.json');
const V = version.split('.')[0];

const PORT = process.env.PORT;
const HOST = process.env.HOST;


chai.use(chaiHttp);

function flashcardsTest() {

  it('it returns 200 with correct body', function(done) {
    const id = 7
    chai.request(`http://${HOST}:${PORT}`)
      .get(`/api/v${V}/flashcards/${id}`)
      .end(function(err, res) {
        should.not.exist(err)
        const flashcard = res.body;
        res.should.be.json;
        res.should.have.status(200);
        flashcard.should.have.all.keys('front', 'back', 'id', '_id', '__v');
        flashcard.id.should.be.equal(id)
        flashcard._id.should.match(/^[a-z0-9]{24}$/);
        flashcard.front.should.be.a('string');
        flashcard.back.should.be.a('string');
        flashcard.id.should.be.a('number');
        done();
      });
  });

  it('it returns 404 if flashcard does not exist', function(done) {
    const id = -1
    chai.request(`http://${HOST}:${PORT}`)
      .get(`/api/v${V}/flashcards/${id}`)
      .end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(404);
        done();
      });
  })

};

module.exports = flashcardsTest;

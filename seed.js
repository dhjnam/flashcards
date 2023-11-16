require('dotenv').config({ path: './.test.env' });
const mongoose = require('./db');

const { faker } = require('@faker-js/faker');

faker.seed(0);

(async function() {

  const db = mongoose.connection;
  
  await db.dropCollection('flashcards');
  await db.createCollection('flashcards');
  
  const Flashcard = require('./schemas/flashcards.schema');
  
  // TODO: seed flashcards
  const noFlashcards = 10;
  const fronts = faker.word.words(noFlashcards).split(' ');
  const backs = faker.word.words(noFlashcards).split(' ');
  const documents = [];
  
  for (let id = 0; id < noFlashcards; id++) {
    documents.push(new Flashcard({ id, front: fronts[id], back: backs[id] }));
  }
  
  await Flashcard.bulkSave(documents)
  
  // TODO: seed users
  
  db.close();
  
})();  


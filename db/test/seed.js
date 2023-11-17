require('dotenv').config({ path: '../../.test.env' });
const { faker } = require('@faker-js/faker');

const Flashcard = require('../../schemas/flashcards.schema');

faker.seed(1);

module.exports = async function(mongoose) {

  const db = mongoose.connection;
  
  console.log('... Dropping flashcards');
  await db.dropCollection('flashcards');
  console.log('... Creating flashcards');
  await db.createCollection('flashcards');
  
  const flashcards = await generateFlashcards(10);

  console.log('... Saving fake flashcards')
  await Flashcard.bulkSave(flashcards)
  
  // TODO: seed users
  
};

const generateFlashcards = async function(n) {

  console.log('... Generating fake flashcards');
  
  // TODO: seed flashcards
  const fronts = faker.word.words(n).split(' ');
  const backs = faker.word.words(n).split(' ');
  const flashcards = [];
  
  for (let id = 0; id < n; id++) {
    flashcards.push(new Flashcard({ id, front: fronts[id], back: backs[id] }));
  }
  
  return flashcards
};

const express = require('express');
const router = express.Router();
const Flashcard = require('../schemas/flashcards.schema')

/**
 * @openapi
 * /flashcards/{flashcardId}:
 *   get:
 *     tags:
 *       - flashcards
 *     summary: Get flashcard by id
 *     parameters:
 *       - $ref: '#/components/parameters/path-flashcard-id'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/flashcard'
 *       '404':
 *         description: "Not found: flashcard does not exist"
 */
router.get('/:flashcardId', async function(req, res, next) {
  const flashcard = await Flashcard.findOne({ id: req.params.flashcardId });
  if (!flashcard) {
    res.status(404).json({ message: 'Not Found: flashcard does not exist' });
    return;
  }
  res.json(flashcard);
});

module.exports = router;
const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    flashcard:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       front:
 *         type: string
 *       back:
 *         type: string
 *     required:
 *       - front
 *       - back
 *     example:
 *       value:
 *         id: 0
 *         front: Tag
 *         back: day
 *    flashcards:
 *    type: array
 *    items:
 *      $ref: '#/components/schemas/flashcard'
 *    example:
 *      value:
 *        - id: 0
 *          front: Tag
 *          back: day
 *        - id: 1
 *          front: Nacht
 *          back: night
 *        - id: 2
 *          front: Sonne
 *          back: sun
 *        - id: 3
 *          front: Mond
 *          back: moon
 *  parameters:
 *    path-flashcard-id:
 *      name: flashcardId
 *      in: path
 *      required: true
 *      schema:
 *        type: integer
 *        format: int64
 *      description: Numeric id of a flashcard
 */

const flashcardSchema = new mongoose.Schema({
  id: Number,
  front: { type: String, default: '' },
  back: { type: String, default: '' }
})

const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard
const cards = require('express').Router();
const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getAllCards);

cards.post('/', createCard);

cards.delete('/:cardId', deleteCard);

cards.put('/:cardId/likes', likeCard);

cards.delete('/:cardId/likes', dislikeCard);

module.exports = cards;

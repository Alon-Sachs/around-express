const Card = require('../models/card');

const errorCodes = {
  validationError: 400,
  notFoundError: 404,
  defaultError: 500,
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(errorCodes.defaultError).send({ message: 'Default Error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(errorCodes.validationError).send({ message: err.message });
      return res.status(errorCodes.defaultError).send({ message: 'Default Error' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error('there is no card with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(errorCodes.notFoundError).send({ message: err.message });
      return res.status(errorCodes.defaultError).send({ message: 'Default Error' });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('there is no card with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(errorCodes.notFoundError).send({ message: err.message });
      if (err.name === 'ValidationError') return res.status(errorCodes.validationError).send({ message: err.message });
      return res.status(errorCodes.defaultError).send({ message: 'Default Error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('there is no card with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(errorCodes.notFoundError).send({ message: err.message });
      if (err.name === 'ValidationError') return res.status(errorCodes.validationError).send({ message: err.message });
      return res.status(errorCodes.defaultError).send({ message: 'Default Error' });
    });
};

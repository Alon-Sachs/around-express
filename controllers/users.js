const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require('../utils/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(DEFAULT).send({ message: 'Default Error' }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('there is no user with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(NOT_FOUND).send({ message: err.message });
      if (err.name === 'CastError') return res.status(BAD_REQUEST).send({ message: err.message });
      return res.status(DEFAULT).send({ message: 'Default Error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: err.message });
      return res.status(DEFAULT).send({ message: 'Default Error' });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('there is no user with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(NOT_FOUND).send({ message: err.message });
      if (err.name === 'CastError' || err.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: err.message });
      return res.status(DEFAULT).send({ message: 'Default Error' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('there is no user with the requested id');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError') return res.status(NOT_FOUND).send({ message: err.message });
      if (err.name === 'CastError' || err.name === 'ValidationError') return res.status(BAD_REQUEST).send({ message: err.message });
      return res.status(DEFAULT).send({ message: 'Default Error' });
    });
};

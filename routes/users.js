const users = require('express').Router();
const {
  getAllUsers, getUser, createUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

users.get('/', getAllUsers);

users.get('/:userId', getUser);

users.post('/', createUser);

users.patch('/me', updateUserProfile);

users.patch('/me/avatar', updateUserAvatar);

module.exports = users;

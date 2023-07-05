const users = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

users.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');

  fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
});

users.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');

  fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      const user = JSON.parse(data).find((selectedUser) => selectedUser._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
});

module.exports = users;

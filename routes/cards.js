const cards = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

cards.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');

  fsPromises.readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred on the server' }));
});

module.exports = cards;

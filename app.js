const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const cards = require('./routes/cards');
const users = require('./routes/users');

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} with the message ${err.message} was not handled. Pay attention to it!`);
});

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64af0be1478ee24c81a1f476',
  };

  next();
});

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

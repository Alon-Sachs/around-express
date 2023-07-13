const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { NOT_FOUND } = require('./utils/constants');

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin} ${err.name} with the message ${err.message} was not handled. Pay attention to it!`);
});

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
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
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

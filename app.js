const express = require('express');
const cards = require('./routes/cards');
const users = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

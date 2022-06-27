const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./controllers/users');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Несуществующий адрес' });
});

app.listen(PORT, () => {
});

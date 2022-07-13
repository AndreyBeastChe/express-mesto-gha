const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { reg } = require('./constants');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// app.use(logger);
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const validate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(reg),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

app.post('/signin', validateLogin, login);
app.post('/signup', validate, createUser);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Несуществующий адрес'));
});

app.use(errorLogger);
app.use(errors());
// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://vse-na-meste.nomoredomains.xyz',
  'http://api.vse-na-meste.nomoredomains.xyz',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

// Если это предварительный запрос, добавляем нужные заголовки
if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
}

// сохраняем список заголовков исходного запроса
const requestHeaders = req.headers['access-control-request-headers'];
if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Что-то пошло не так' });
});

app.listen(PORT, () => {
});

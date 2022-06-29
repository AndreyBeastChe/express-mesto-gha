const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const SECRET_KEY = 'secret';

const throwUnauthorizedError = () => {
  const error = new Error('Авторизуйтесь для доступа');
  error.statusCode = 401;
  throw error;
};

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throwUnauthorizedError();
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          throwUnauthorizedError();
        }

        req.user = payload;
        next();
      });
  } catch (err) {
    throwUnauthorizedError();
  }
};

module.exports = { isAuthorized };

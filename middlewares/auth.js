const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const UnAuthorizedError = require('../errors/UnauthorizedError');

const SECRET_KEY = 'secret';

// const throwUnauthorizedError = () => {
//   const error = new Error('Авторизуйтесь для доступа');
//   error.statusCode = 401;
//   throw error;
// };

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          next(new UnAuthorizedError('Необходима авторизация'));
        }

        req.user = payload;
        next();
      });
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }
};

module.exports = { isAuthorized };

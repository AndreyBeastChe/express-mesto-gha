const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const UnAuthorizedError = require('../errors/UnauthorizedError');

const SECRET_KEY = 'secret';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }

  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, SECRET_KEY, { expiresIn: '7d' });

    // User.findOne({ _id: payload._id })
    //   .then((user) => {
    //     console.log('яууу');
    //     if (!user) {
    //       next(new UnAuthorizedError('Необходима авторизация'));
    //     }

        req.user = payload;
        next();
      // });
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }
};

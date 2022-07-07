const jwt = require('jsonwebtoken');
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

    req.user = payload;
    next();
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
  }
};

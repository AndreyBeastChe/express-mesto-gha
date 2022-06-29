//const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'secret';

//validator.isEmail('foo@bar.com');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // хешируем пароль
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка данных' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((foundUser) => {
      if (!foundUser) {
        const err = new Error('Неправильный емейл или пароль');
        err.statusCode = 403;
        throw err;
      }

      return Promise.all([
        foundUser,
        bcrypt.compare(password, foundUser.password),
      ]);
    })
    .then(([isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        const err = new Error('Неправильный емейл или пароль');
        err.statusCode = 403;
        throw err;
      }
    })
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' }),
      });
    });
};

// const login = (req, res) => {
//   const { email, password } = req.body;
//   return userSchema.findUserByCredentials(email, password)
//     .then((user) => {
//       res.send({
//         token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
//       });
//     })
//     .catch((err) => {
//       res
//         .status(401)
//         .send({ message: err.message });
//     });
// };


// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           return user;
//         });
//     });
// };







// if (!email || !password) {
//   const error = new Error('Не передан емейл или пароль');
//   error.statusCode = 400;
//   throw error;
// }

// Admin
//   .findOne({ email })
//   .then((foundUser) => {
//       if (!foundUser) {
//           const err = new Error('Неправильный емейл или пароль');
//           err.statusCode = 403;
//           throw err;
//       }

//       return Promise.all([
//           foundUser,
//           bcrypt.compare(password, foundUser.password)
//       ]);
//   })
//   .then(([user, isPasswordCorrect]) => {
//       if (!isPasswordCorrect) {
//           const err = new Error('Неправильный емейл или пароль');
//           err.statusCode = 403;
//           throw err;
//       }

//       return generateToken({ email: user.email, type: 'admin' });
//   })
//   .then((token) => {
//       res.send({ token });
//   });

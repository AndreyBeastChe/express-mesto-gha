const User = require("../models/user");
const NotFoundError = require('../error/NotFoundError');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => {
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
  .orFail(() => {
    next(new NotFoundError('Запрашиваемый пользователь не найден'));
  })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
  .orFail(() => {
    next(new NotFoundError('Запрашиваемый пользователь не найден'));
  })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true }
  )
  .orFail(() => {
    next(new NotFoundError('Запрашиваемый пользователь не найден'));
  })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  .orFail(() => {
    next(new NotFoundError('Запрашиваемый пользователь не найден'));
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

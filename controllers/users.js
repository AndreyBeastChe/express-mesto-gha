const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Ошибка данных" });
      }
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

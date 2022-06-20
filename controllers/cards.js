const Card = require("../models/card");
const NotFoundError = require("../error/NotFoundError");
const BadRequestError = require("../error/BadRequestError");

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      next(new NotFoundError("Запрашиваемая карточка не найдена"));
    })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError("Запрашиваемая карточка не найдена"));
    })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => {
      next(new NotFoundError("Запрашиваемая карточка не найдена"));
    })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      next(new NotFoundError("Запрашиваемая карточка не найдена"));
    })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: "Ошибка" }));
};

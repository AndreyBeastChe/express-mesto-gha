const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');


module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка данных' });
      }
      if (err.name === 'Forbidden') {
        return res.status(403).send({ message: 'Можно удалять только свою карточку' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка данных' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка данных' });
      }
      return res.status(500).send({ message: 'Ошибка' });
    });
};

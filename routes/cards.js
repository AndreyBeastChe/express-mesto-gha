const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { reg } = require('../constants');

const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(reg),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

router.post('', validateCard, createCard);

router.get('', getCards);
router.delete('/:cardId', validateId, deleteCardById);

router.put('/:cardId/likes', validateId, likeCard);
router.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = router;

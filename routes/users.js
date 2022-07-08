const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { reg } = require('../constants');
const {
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const validateUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(reg),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});

router.get('/me', getCurrentUser);
router.get('', getUsers);
router.get('/:userId', validateId, getUsersById);

router.patch('/me', validateUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const reg = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:?#[\]@!$&'()*+,;=]+)/;

const {
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const validateUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(reg),
  }),
});

router.get('', getUsers);
router.get('/:userId', getUsersById);

router.patch('/me', validateUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;

const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('', getUsers);
router.get('/:userId', getUsersById);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

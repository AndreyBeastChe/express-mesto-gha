const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUsersById,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.post("", createUser);

router.get("", getUsers);
router.get("/:userId", getUsersById);

router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;

const router = require("express").Router();

const User = require("../controller/userController");
const validation = require("../middlewares/validation");
const authentication = require("../middlewares/authenticate");

router.get("/", authentication, User.getAllUsers);
router.get("/:userid", authentication, validation.checkUser, User.getUserById);
router.patch("/:userid", authentication, validation.checkUser, User.updateUser);
router.delete("/:userid", authentication, validation.checkUser, User.removeUser);

module.exports = router;

const router = require("express").Router();

const Auth = require("../controller/authController");
const authenticate = require("../middlewares/authenticate");

router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.get("/check", authenticate, Auth.checkToken);

module.exports = router;

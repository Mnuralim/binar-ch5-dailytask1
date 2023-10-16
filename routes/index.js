const router = require("express").Router();

const Product = require("./productRouter");
const Auth = require("./authRouter");
const Admin = require("./adminRouter");
const User = require("./userRouter");
const Shop = require("./shopRouter");

router.use("/api/v1/products", Product);
router.use("/api/v1/auth", Auth);
router.use("/api/v1/users", User);
router.use("/api/v1/shops", Shop);

router.use("/", Admin);

module.exports = router;

const router = require("express").Router();

const checkRole = require("../middlewares/checkRole");
const Shop = require("../controller/shopController");
const authentication = require("../middlewares/authenticate");
const validation = require("../middlewares/validation");

router.get("/", authentication, Shop.getAllShops);
router.post("/", authentication, checkRole("owner"), Shop.createShop);
router.get("/:shopid", authentication, validation.checkShop, Shop.getShopById);
router.patch("/:shopid", authentication, validation.checkShop, checkRole("owner"), Shop.updateShop);
router.delete("/:shopid", authentication, validation.checkShop, checkRole("owner"), Shop.deleteShop);

module.exports = router;

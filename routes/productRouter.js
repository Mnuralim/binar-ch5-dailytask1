const router = require("express").Router();

const checkRole = require("../middlewares/checkRole");
const Product = require("../controller/productController");
const authentication = require("../middlewares/authenticate");
const checkOwnership = require("../middlewares/checkOwnership");
const validation = require("../middlewares/validation");

const upload = require("../middlewares/uploader");

router.post("/", authentication, checkRole("owner"), checkOwnership, upload.single("image"), Product.createProduct);
router.get("/", authentication, checkRole("owner"), Product.findProducts);
router.get("/:prodid", authentication, validation.checkProduct, Product.findProductById);
router.patch("/:prodid", authentication, validation.checkProduct, checkRole("owner"), checkOwnership, Product.UpdateProduct);
router.delete("/:prodid", authentication, validation.checkProduct, checkRole("owner"), checkOwnership, Product.deleteProduct);

module.exports = router;

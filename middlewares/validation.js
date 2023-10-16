const { User, Shop, Product } = require("../models");
const ApiError = require("../utils/apiError");

const checkUser = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userid,
      },
    });
    if (!user) {
      next(new ApiError("User not found", 404));
    }
    next();
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const checkShop = async (req, res, next) => {
  const { shopid } = req.params;
  try {
    const shop = await Shop.findOne({
      where: {
        id: shopid,
      },
    });
    if (!shop) {
      return next(new ApiError("Shop not found", 404));
    }
    next();
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const checkProduct = async (req, res, next) => {
  const { prodid } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: prodid,
      },
    });
    if (!product) {
      return next(new ApiError("Product not found", 404));
    }
    next();
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  checkUser,
  checkShop,
  checkProduct,
};

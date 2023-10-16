const { Shop, User } = require("../models");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
  const { name } = req.body;
  const { user: currentUser } = req;
  try {
    const shop = await Shop.create({
      name,
    });
    const user = await User.findByPk(currentUser.id);
    user.shopId = shop.id;
    await user.save();

    res.status(201).json({
      status: "Success",
      message: "Success add new shop",
      data: {
        shop,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getAllShops = async (req, res, next) => {
  try {
    const shops = await Shop.findAll();
    res.status(200).json({
      status: "Success",
      data: {
        shops,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getShopById = async (req, res, next) => {
  const { shopid } = req.params;
  try {
    const shop = await Shop.findOne({
      where: {
        id: shopid,
      },
    });
    res.status(200).json({
      status: "Success",
      data: {
        shop,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const updateShop = async (req, res, next) => {
  const { shopid } = req.params;
  const { name } = req.body;
  try {
    const shop = await Shop.update(
      {
        name,
      },
      {
        where: {
          id: shopid,
        },
      }
    );
    res.status(201).json({
      status: "Success",
      message: "Success update shop",
      data: {
        shop,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const deleteShop = async (req, res, next) => {
  const { shopid } = req.params;
  try {
    const shop = await Shop.destroy({
      where: {
        id: shopid,
      },
    });

    await User.update(
      {
        shopId: null,
      },
      {
        where: {
          shopId: shopid,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success delete shop",
      data: {
        shop,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  getAllShops,
  getShopById,
  updateShop,
  createShop,
  deleteShop,
};

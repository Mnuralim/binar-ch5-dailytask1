const { Product, Shop } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const user = req.user;
  const file = req.file;
  let img;

  try {
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageUrl: img,
      shopId: user.shopId,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Shop,
        attributes: ["id", "name"],
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        products,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findProductById = async (req, res, next) => {
  const { prodid } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: prodid,
      },
      include: {
        model: Shop,
        attributes: ["id", "name"],
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const UpdateProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const { prodid } = req.params;
  const user = req.user;
  try {
    const findProduct = await Product.findByPk(prodid);
    if (findProduct.shopId !== user.shopId) return next(new ApiError("You are not the owner of the store that owns this product", 400));

    await Product.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: prodid,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteProduct = async (req, res, next) => {
  const { prodid } = req.params;
  const user = req.user;
  try {
    const findProduct = await Product.findByPk(prodid);
    if (findProduct.shopId !== user.shopId) return next(new ApiError("You are not the owner of the store that owns this product", 400));

    await Product.destroy({
      where: {
        id: prodid,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  UpdateProduct,
  deleteProduct,
};

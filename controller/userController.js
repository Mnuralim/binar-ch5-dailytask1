const { User, Shop } = require("../models");
const ApiError = require("../utils/apiError");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Shop,
        attributes: ["id", "name"],
      },
    });
    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const getUserById = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userid,
      },
      include: {
        model: Shop,
        attributes: ["id", "name"],
      },
    });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  const { userid } = req.params;
  const { name, age, address } = req.body;

  try {
    const user = await User.update(
      {
        name,
        age,
        address,
      },
      {
        where: {
          id: userid,
        },
      }
    );
    res.status(200).json({
      status: "Success",
      message: "success update user",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const removeUser = async (req, res, next) => {
  const { userid } = req.params;
  try {
    const deleteUser = await User.destroy({
      where: {
        id: userid,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Success delete user",
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  removeUser,
};

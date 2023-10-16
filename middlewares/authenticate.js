const jwt = require("jsonwebtoken");
const { User, Auth } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async function (req, res, next) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(new ApiError("no token", 401));
    }
    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT);

    const user = await User.findByPk(payload.id, {
      include: ["Auth"],
    });

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

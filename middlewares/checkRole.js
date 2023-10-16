const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== role) {
        next(new ApiError(`Kamu bukan ${role}, akses dilarang`, 401));
      }
      next();
    } catch (error) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;

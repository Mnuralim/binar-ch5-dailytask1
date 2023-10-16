const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const register = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address, role } = req.body;

  try {
    //validation untuk check email ada belum
    const user = await Auth.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 characters", 400));
    }

    if (password !== confirmPassword) {
      return next(new ApiError("password does not match", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const newUser = await User.create({
      name,
      address,
      age,
      role,
    });

    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser.get({ plain: true }),
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
        },
        process.env.JWT
      );

      res.status(200).json({
        status: "Success",
        message: "success login",
        data: token,
      });
    } else {
      next(new ApiError("invalid email or wrong password", 400));
    }
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const checkToken = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      status: "Success",
      data: {
        id: user.id,
        name: user.name,
        email: user.Auth.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = {
  register,
  login,
  checkToken,
};

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getAllUsers = async (req, res) => {
  const user = await User.find();
  if (user.length === 0) {
    res.status(404).send({
      msg: "empty user",
    });
  } else {
    res.status(200).send(user);
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({
        message: "Username Already Exist",
        status: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    if (user) {
      delete user.password;
      const token = jwt.sign({ user: user.username }, process.env.SECRET_KEY, {
        expiresIn: "48h",
      });
      return res.json({
        status: true,
        token: token,
        user: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "username invalid",
        status: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: "password invalid",
        status: false,
      });
    }
    if (user && isPasswordValid) {
      delete user.password;
      const token = jwt.sign({ user: user.username }, process.env.SECRET_KEY, {
        expiresIn: "48h",
      });
      return res.json({
        status: true,
        token: token,
        user: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

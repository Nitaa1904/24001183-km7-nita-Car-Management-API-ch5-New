const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Token is missing",
        isSuccess: false,
        data: null,
      });
    }

    const token = bearerToken.split("Bearer ")[1]?.trim();
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Token format is invalid",
        isSuccess: false,
        data: null,
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.userId);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

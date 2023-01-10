const jwt = require("jsonwebtoken");

const signJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
};

const responseError = (res, error) => {
  return res.status(500).json({
    message: error.message,
  });
};

const responseMessage = (res, statusCode, message, data) => {
  return res.status(statusCode || 500).json({
    message: message || "Something went wrong",
    data: data ? data : undefined,
  });
};

module.exports = {
  signJWT,
  responseError,
  responseMessage,
};

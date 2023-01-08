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

module.exports = {
  signJWT,
  responseError,
};

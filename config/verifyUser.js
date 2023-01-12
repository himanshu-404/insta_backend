const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          return false;
        }
        return data;
      });

      if (!decoded || !decoded?.userId) {
        return res.status(401).json({
          message: "invalid token",
        });
      }

      const user = await User.findById(decoded?.userId);

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user.id;

      next();
    } catch (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token found",
    });
  }
};

module.exports = { verifyToken };

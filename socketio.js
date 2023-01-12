const cookieParser = require("cookie");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const connection = (socket) => {
  socket.join(socket.userId);
  socket.on("disconnect", () => {});
};

const socketMiddleware = async (socket, next) => {
  let cookie = null;
  try {
    if (socket.handshake.headers.cookie) {
      cookie = cookieParser.parse(socket.handshake.headers.cookie);
    }

    if (!cookie || !cookie.access_token) {
      return next(new Error("Authentication error"));
    }

    const verifyToken = jwt.verify(
      cookie.access_token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error"));
        }
        return decoded;
      }
    );

    if (!verifyToken || !verifyToken?.userId) {
      return next(new Error("Id not found in token"));
    }

    const user = await User.findById(verifyToken?.userId);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.userId = user.id;

    return next();
  } catch (error) {
    return next(new Error(error.message));
  }
};

module.exports = { connection, socketMiddleware };

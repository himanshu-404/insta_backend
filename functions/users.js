const {
  responseError,
  responseMessage,
  signJWT,
} = require("../config/commonFunction");
const User = require("../models/User");
const Followers = require("../models/Followers");
const Following = require("../models/Following");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { username: email }],
    });

    if (!user || !user.password) {
      return responseMessage(res, 404, "User not found");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return responseMessage(res, 500, err);
      } else if (!result) {
        return responseMessage(res, 401, "Invalid Credentials");
      } else {
        return responseMessage(res, 200, "Login Success", {
          userId: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          accessToken: signJWT(user._id),
        });
      }
    });
  } catch (error) {
    return responseError(res, error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    const userWithEmail = await User.findOne({ email });
    const userWithUsername = await User.findOne({ username });

    if (userWithEmail) {
      return responseMessage(res, 404, "User With this Email Already exist");
    }
    if (userWithUsername) {
      return responseMessage(res, 404, "This Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      fullName: fullName,
      username: username,
      password: hashedPassword,
    });

    await Followers.create({
      user: user._id,
      followers: [],
    });

    await Following.create({
      user: user._id,
      following: [],
    });

    return responseMessage(res, 200, "User Created Successfully", {
      userId: user._id,
      email: user.email,
      username: user.username,
      accessToken: signJWT(user._id),
    });
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};

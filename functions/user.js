const { responseError, responseMessage } = require("../config/commonFunction");
const Followers = require("../models/Followers");
const Following = require("../models/Following");
const Notification = require("../models/Notification");
const User = require("../models/User");

const checkUserById = async (user_id) => {
  try {
    const userData = User.findById(user_id);

    if (!userData) {
      return {
        status: false,
        message: "User not found",
        statusCode: 404,
      };
    }

    return {
      status: true,
      message: "User found",
      statusCode: 200,
      data: userData,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      statusCode: 500,
    };
  }
};

const followOrUnFollowUser = async (req, res) => {
  try {
    //user to follow
    const { userId } = req.params;

    //login user
    const user = req.user;

    const validateUser = await checkUserById(userId);
    if (!validateUser.status) {
      return responseMessage(
        res,
        validateUser.statusCode,
        validateUser.message
      );
    }

    const updateFollowing = await Following.updateOne(
      { user: user, "following.user": { $ne: userId } },
      { $push: { following: { user: userId } } }
    );
    const updateFollower = await Followers.updateOne(
      { user: userId, "follower.user": { $ne: user } },
      { $push: { follower: { user: user } } }
    );

    // if user already followed then unFollow
    if (
      updateFollowing.modifiedCount === 0 ||
      updateFollower.modifiedCount === 0
    ) {
      const unFollowingUser = await Following.updateOne(
        { user: user },
        { $pull: { following: { user: userId } } }
      );
      const unFollowUser = await Followers.updateOne(
        { user: userId },
        { $pull: { follower: { user: user } } }
      );

      if (unFollowingUser.acknowledged && unFollowUser.acknowledged) {
        return responseMessage(res, 200, "User UnFollowed successfully");
      }
    }

    //save and send Notification

    const notification = await Notification.create({
      sender: user,
      receiver: userId,
      notificationType: "follow",
    });

    const isFollowing = await Following.findOne({
      user: userId,
      "following.user": user,
    });

    socketIo.to(userId).emit("notification", {
      notificationType: "follow",
      sender: {
        _id: validateUser._id,
        username: validateUser.username,
        avatar: validateUser.avatar,
      },
      receiver: userId,
      date: notification.createdAt,
      isFollowing: !!isFollowing,
    });

    return responseMessage(res, 200, "User followed successfully");
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = {
  followOrUnFollowUser,
};

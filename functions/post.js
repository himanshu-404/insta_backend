const { responseError, responseMessage } = require("../config/commonFunction");
const linkify = require("linkifyjs");
require("linkify-plugin-hashtag");
const Post = require("../models/Post");
const PostLikes = require("../models/PostLikes");
const filters = require("../utils/filters");
const User = require("../models/User");

const postImageForUser = async (req, res) => {
  try {
    if (!req.file) {
      return responseError(res, { message: "File Is Required" });
    }

    const loginUser = req.user;
    const { caption, filter } = req.body;
    const filterName = filters.find((data) => data.name === filter);
    const hashTags = [];

    if (caption && caption !== "") {
      linkify.find(caption).forEach((result) => {
        if (result.type === "hashtag") {
          hashTags.push(result.value.substring(1));
        }
      });
    }

    const user = await User.findById({
      _id: loginUser,
    });

    const post = await Post.create({
      image: req.file.path,
      filter: filterName ? filterName.filter : "",
      caption: caption,
      hashTags: hashTags,
      author: loginUser,
      thumbnail: "",
    });

    const postLikes = await PostLikes.create({
      post: post._id,
    });

    return responseMessage(res, 200, "Post Successfully", {
      ...post.toObject(),
      postLikes: [],
      comments: [],
      author: { avatar: user.avatar, username: user.username },
    });
  } catch (error) {
    return responseError(res, error);
  }
};

module.exports = { postImageForUser };

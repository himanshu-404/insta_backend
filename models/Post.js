const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: String,
    filter: String,
    thumbnail: String,
    caption: String,
    hashTags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

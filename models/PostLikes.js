const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostLikeSchema = new Schema({
  post: {
    type: Schema.ObjectId,
    ref: "Post",
  },
  likes: [{ author: { type: Schema.ObjectId, ref: "User" } }],
});

const PostLike = mongoose.model("PostLike", PostLikeSchema);

module.exports = PostLike;

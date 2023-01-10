const mongoose = require("mongoose");

const commentLikeSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    likes: [{ author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  },
  {
    timestamps: true,
  }
);

const CommentLike = mongoose.model("CommentLike", commentLikeSchema);
module.exports = CommentLike;

const mongoose = require("mongoose");

const commentReplyLikeSchema = new mongoose.Schema(
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

const CommentReplyLike = mongoose.model(
  "CommentReplyLike",
  commentReplyLikeSchema
);
module.exports = CommentReplyLike;

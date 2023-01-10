const mongoose = require("mongoose");

const commentReplySchema = new mongoose.Schema(
  {
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    message: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const CommentReply = mongoose.model("CommentReply", commentReplySchema);
module.exports = CommentReply;

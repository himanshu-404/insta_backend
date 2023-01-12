const mongoose = require("mongoose");

const followersSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    follower: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Followers = mongoose.model("Followers", followersSchema);
module.exports = Followers;

const mongoose = require("mongoose");

const followersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Followers = mongoose.model("Followers", followersSchema);
module.exports = Followers;
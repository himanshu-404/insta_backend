const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 3,
    },
    password: {
      type: String,
      minlength: 8,
    },
    avatar: String,
    bio: {
      type: String,
      maxlength: 130,
    },
    website: {
      type: String,
      maxlength: 65,
    },
    bookmarks: [
      {
        post: {
          type: Schema.ObjectId,
          ref: "Post",
        },
      },
    ],
    githubId: Number,
    private: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

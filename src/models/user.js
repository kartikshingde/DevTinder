const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { default: isURL } = require("validator/lib/isURL");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid ");
        }
      },
    },
    password: {
      type: String,
      minLength: 4,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not Valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of a user",
    },
    profileUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
      validate(value) {
        if (!validator.isURL) {
          throw new Error("Enter Valid URL");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dont@writeByYourself#");

  return token;
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid=await bcrypt.compare(userInputPassword,passwordHash)

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);

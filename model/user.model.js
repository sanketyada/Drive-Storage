const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username is Required"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, "Email is Required"],
  },
  password: {
    type: String,
    required: true,

    minlength: [5, "Password is Required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

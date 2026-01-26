const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "Path is Required"],
  },
  originalname: {
    type: String,
    required: [true, "Original path is Required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is Required"],
  },
},{timestamps:true});

const File = mongoose.model("File", fileSchema);
module.exports = File;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userCity: {
    type: String,
    required: true,
  },
  userState: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    // required : true,
  },
  role: {
    type: String,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("userData", userSchema);

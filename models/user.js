const mongoose = require("mongoose");

const User = mongoose.model("user", {
  image: { type: String },
  imageUrl: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = User;

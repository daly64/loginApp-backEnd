const mongoose = require("mongoose");

const User = mongoose.model("user", {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = User;

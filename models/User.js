const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  username: String,

  token: String,
  hash: String,
  salt: String,
  // avatar: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = User;

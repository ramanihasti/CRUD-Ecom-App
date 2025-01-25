const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

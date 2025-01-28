const mongoose = require("mongoose");

const expiredTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: process.env.JWT_EXPIRY },
});

const ExpiredToken = mongoose.model("User", expiredTokenSchema);

module.exports = ExpiredToken;

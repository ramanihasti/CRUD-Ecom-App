const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
} = require("../controller/AuthController");
const {
  authMiddlewares,
  adminAuthMiddlewares,
} = require("../middlewares/authMiddlewares");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddlewares, logout);
authRouter.get("/getUser", authMiddlewares, getUser);
authRouter.get("/getAdmin", adminAuthMiddlewares, getUser);

module.exports = authRouter;

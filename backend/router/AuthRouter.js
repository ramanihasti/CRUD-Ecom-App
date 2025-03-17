const express = require("express");
const { register, login, logout } = require("../controller/AuthController");
const { authMiddlewares } = require("../middlewares/authMiddlewares");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddlewares, logout);

module.exports = authRouter;

const express = require("express");
const {
  getHomePage,
  addHomePage,
  updateHomePage,
} = require("../controller/HomePageController");
const { adminAuthMiddlewares } = require("../middlewares/authMiddlewares");
const homePageRouter = express.Router();

homePageRouter.get("/", getHomePage);
homePageRouter.post("/", adminAuthMiddlewares, addHomePage);
homePageRouter.patch("/", adminAuthMiddlewares, updateHomePage);

module.exports = homePageRouter;

const express = require("express");
const {
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug,
} = require("../controller/PageController");
const { adminAuthMiddlewares } = require("../middlewares/authMiddlewares");
const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getSinglePage);
pageRouter.get("/slug/:slug", getPageBySlug);
pageRouter.post("/", adminAuthMiddlewares, addPage);
pageRouter.patch("/:id", adminAuthMiddlewares, updatePage);
pageRouter.delete("/:id", adminAuthMiddlewares, deletePage);

module.exports = pageRouter;

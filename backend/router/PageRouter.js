const express = require("express");
const {
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
} = require("../controller/PageController");
const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getSinglePage);
pageRouter.post("/", addPage);
pageRouter.patch("/:id", updatePage);
pageRouter.delete("/:id", deletePage);

module.exports = pageRouter;

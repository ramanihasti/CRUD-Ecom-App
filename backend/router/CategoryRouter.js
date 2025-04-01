const express = require("express");
const {
  getAllCategory,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryController");
const { adminAuthMiddlewares } = require("../middlewares/authMiddlewares");
const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.post("/", adminAuthMiddlewares, addCategory);
categoryRouter.patch("/:id", adminAuthMiddlewares, updateCategory);
categoryRouter.delete("/:id", adminAuthMiddlewares, deleteCategory);

module.exports = categoryRouter;

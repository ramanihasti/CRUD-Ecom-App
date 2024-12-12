const express = require("express");
const {
  getAllCategory,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/CategoryController");
const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.post("/", addCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;

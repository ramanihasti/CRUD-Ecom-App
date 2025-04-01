const express = require("express");
const {
  getAllSubCategories,
  getSinglelSubCategory,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategoriesByCategorySlug,
  getAllSubCategoriesByCategoryId,
} = require("../controller/SubCategoryController");
const { adminAuthMiddlewares } = require("../middlewares/authMiddlewares");
const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/category/:categoryId", getAllSubCategoriesByCategoryId);
subCategoryRouter.get(
  "/category/slug/:categorySlug",
  getAllSubCategoriesByCategorySlug
);
subCategoryRouter.get("/:id", getSinglelSubCategory);
subCategoryRouter.post("/", adminAuthMiddlewares, addSubCategory);
subCategoryRouter.patch("/:id", adminAuthMiddlewares, updateSubCategory);
subCategoryRouter.delete("/:id", adminAuthMiddlewares, deleteSubCategory);

module.exports = subCategoryRouter;

const express = require("express");
const {
  getAllSubCategories,
  getSinglelSubCategory,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategoriesByCategoryId,
  getAllSubCategoriesByCategorySlug,
} = require("../controller/SubCategoryController");
const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/category/:categoryId", getAllSubCategoriesByCategoryId);
subCategoryRouter.get(
  "/category/slug/:categorySlug",
  getAllSubCategoriesByCategorySlug
);
subCategoryRouter.get("/:id", getSinglelSubCategory);
subCategoryRouter.post("/", addSubCategory);
subCategoryRouter.patch("/:id", updateSubCategory);
subCategoryRouter.delete("/:id", deleteSubCategory);

module.exports = subCategoryRouter;

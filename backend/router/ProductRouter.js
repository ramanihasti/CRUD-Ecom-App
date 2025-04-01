const express = require("express");
const {
  addProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getAllProductsBySubCategorySlug,
  getProductBySlug,
} = require("../controller/ProductController");
const { adminAuthMiddlewares } = require("../middlewares/authMiddlewares");
const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get(
  "/subCategory/:subCategorySlug",
  getAllProductsBySubCategorySlug
);
productRouter.get("/:id", getSingleProduct);
productRouter.get("/slug/:slug", getProductBySlug);
productRouter.post("/", adminAuthMiddlewares, addProduct);
productRouter.patch("/:id", adminAuthMiddlewares, updateProduct);
productRouter.delete("/:id", adminAuthMiddlewares, deleteProduct);

module.exports = productRouter;

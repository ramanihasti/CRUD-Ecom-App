const express = require("express");
const {
  addProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductController");
const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/", addProduct);
productRouter.get("/:id", updateProduct);
productRouter.get("/:id", deleteProduct);

module.exports = productRouter;

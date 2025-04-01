const { saveFile, deleteFile } = require("../helper/fileHelper");
const { sendDataResponse, sendErrorResponse } = require("../helper/resHelper");
const Product = require("../modules/Product");
const SubCategory = require("../modules/SubCategory");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    sendDataResponse(res, products);
  } catch (error) {
    sendErrorResponse(res.error.message);
  }
};

const getAllProductsBySubCategorySlug = async (req, res) => {
  try {
    const { subCategorySlug } = req.params;

    const subCategory = await SubCategory.findOne({ slug: subCategorySlug });
    if (!subCategory) {
      return sendErrorResponse(res, "No such sub-category found.", 404);
    }

    const products = await Product.find({ subCategory: subCategory._id });

    sendDataResponse(res, products);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(505).json({ success: false, msg: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return sendErrorResponse(res, "No such product found.", 404);
    }

    sendDataResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addProduct = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req.files", req.files);

    if (!req.files || !req.files.images) {
      return res
        .status(400)
        .json({ success: false, msg: "Product image is required." });
    }
    if (Array.isArray(req.files.images)) {
      const temp = [];
      for (const image of req.files.images) {
        const imageURL = await saveFile(image, "product");
        temp.push(imageURL);
      }

      req.body.images = temp;
    } else {
      const imageURL = await saveFile(req.files.images, "product");
      req.body.images = [imageURL];
    }

    if (req.body.sizes) {
      req.body.sizes = req.body.sizes.split(",");
    }

    if (req.body.colors) {
      req.body.colors = req.body.colors.split(",");
    }

    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    if (!req.body) {
      req.body = {};
    }
    if (!req.body.images) {
      req.body.images = [];
    }

    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        const temp = [];
        for (const imageFile of req.files.images) {
          const imageURL = await saveFile(imageFile, "product");
          temp.push(imageURL);
        }
        for (const imageURL of product.images) {
          if (!req.body.images.includes(imageURL)) {
            await deleteFile(imageURL, "product");
          }
        }
        // console.log("temp", temp);
        req.body.images = [...req.body.images, ...temp];
      } else {
        const imageURL = await saveFile(req.files.images, "product");

        for (const image of product.images) {
          if (!req.body.images.includes(image)) {
            await deleteFile(image, "product");
          }
        }

        req.body.images = [...req.body.images, imageURL];
      }
    }

    if (req.body.sizes) {
      req.body.sizes = req.body.sizes.split(",");
    }

    if (req.body.colors) {
      req.body.colors = req.body.colors.split(",");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: "No such product found." });
    }

    for (const image of product.images) {
      await deleteFile(image, "product");
    }
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProduct,
  getAllProductsBySubCategorySlug,
  getSingleProduct,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
};

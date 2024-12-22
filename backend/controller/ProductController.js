const { saveFile, deleteFile } = require("../helper/fileHelper");
const Product = require("../modules/Product");

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(505).json({ success: false, msg: error.message });
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

const addProduct = async (req, res) => {
  try {
    console.log("req.body", req.body);
    console.log("req.files", req.files);

    if (!req.files || !req.files.images) {
      return res
        .status(404)
        .json({ success: false, msg: "Producct image is require." });
    }
    if (Array.isArray(req.files.images)) {
      const temp = [];

      for (const imageFile of req.files.images) {
        const imageURL = await saveFile(imageFile, "product");
        temp.push(imageURL);
      }

      req.body.images = temp;
    } else {
      const imageURL = await saveFile(req.files.images, "product");
      req.body.images = [imageURL];
    }

    const product = await Product.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(505).json({ success: false, msg: error.message });
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
        req.body.images = [...req.body.images, ...temp];
      } else {
        const imageURL = await saveFile(req.files.images, "product");
        req.body.images = [...req.body.images, imageURL];
      }
    }

    for (const imageURL of product.images) {
      if (!req.body.images.includes(imageURL)) {
        await deleteFile(imageURL);
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(505).json({ success: false, msg: error.message });
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
    res.status(505).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

const Category = require("../modules/Category");
const path = require("path");
const fs = require("fs/promises");
const { sendErrorResponse } = require("../helper/resHelper");
const SubCategory = require("../modules/SubCategory");
const Product = require("../modules/Product");
const Page = require("../modules/Page");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({ createAt: -1 });
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ success: false, msg: "NO such found category." });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, msg: "Category image is require." });
    }
    // console.log("req.body", req.body);
    // console.log("req-files", req.files);

    const category = await Category.findOne({ slug: req.body.slug });

    if (category) {
      return sendErrorResponse(res, "Category by this name already exists.");
    }

    const fileName = Date.now() + "-" + req.files.image.name;
    const fileUpload = path.join(__dirname, "../uploads", "category", fileName);
    await req.files.image.mv(fileUpload);
    const imageURl = `http://localhost:5000/uploads/category/${fileName}`;

    const newCategory = await Category.create({
      name: req.body.name,
      slug: req.body.slug,
      image: imageURl,
    });

    res.json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req.files", req.files);
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const folderPath = path.join(__dirname, "../uploads", "category");

      if (category.image) {
        const fileName = path.basename(category.image);
        console.log("fileName", fileName);
        const filesInfolder = await fs.readdir(folderPath);
        // console.log("filesInfolder", filesInfolder);

        if (filesInfolder.includes(fileName)) {
          await fs.unlink(path.join(folderPath, fileName));
        }
      }

      const newFileName = Date.now() + "-" + req.files.image.name;
      await req.files.image.mv(path.join(folderPath, newFileName));
      const newImageURL = `http://localhost:5000/uploads/category/${newFileName}`;

      req.body.image = newImageURL;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true, // use: by default original database return karta hain aapko updated database chahiye.
    });

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    const subCategory = await SubCategory.findOne({ category: id });
    const product = await Product.findOne({ category: id });
    const page = await Page.findOne({ slug: category.slug });

    if (subCategory || product || page) {
      return sendErrorResponse(
        res,
        "Category cannot be deleted as it is associated with other resources."
      );
    }

    const fileName = path.basename(category.image); // basename URl me se end ka part denga.
    const folderPath = path.join(__dirname, "../uploads", "category");
    const fileInFolder = await fs.readdir(folderPath); // array me sabhi files ko return karenga. and read karenga.

    if (fileInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName)); // unlink file ko delete kar denga.
    }

    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, msg: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllCategory,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

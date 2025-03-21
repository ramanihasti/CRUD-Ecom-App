const SubCategory = require("../modules/SubCategory");
const path = require("path");
const fs = require("fs/promises");
const Category = require("../modules/Category");
const Product = require("../modules/Product");
const Page = require("../modules/Page");

const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllSubCategoriesByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, msg: "No such category found." });
    }

    const subCategories = await SubCategory.find({ category: category._id });

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getAllSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subCategories = await SubCategory.find({ category: categoryId });

    res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSinglelSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addSubCategory = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req-files", req.files);

    if (!req.files || !req.files.image) {
      return res
        .status(404)
        .json({ success: false, msg: "Sub-category image is required." });
    }

    const fileName = Date.now() + "-" + req.files.image.name;
    const uploadPath = path.join(
      __dirname,
      "../uploads",
      "subcategory",
      fileName
    );
    await req.files.image.mv(uploadPath);
    const imageURL = `http://localhost:5000/uploads/subcategory/${fileName}`;

    const subCategory = await SubCategory.create({
      name: req.body.name,
      slug: req.body.slug,
      category: req.body.category,
      image: imageURL,
    });
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    // console.log("req.body", req.body);

    const { id } = req.params;
    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return req
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }

    if (!req.body) {
      req.body = {};
    }

    if (req.files && req.files.image) {
      const fileName = path.basename(subCategory.image);
      const folderPath = path.join(__dirname, "../uploads", "subcategory");
      const filesInfolder = await fs.readdir(folderPath);
      console.log("filesInfolder", filesInfolder);
      if (filesInfolder.includes(fileName)) {
        await fs.unlink(path.join(folderPath, fileName));
      }

      const newFileName = Date.now() + "-" + req.files.image.name;
      await req.files.image.mv(path.join(folderPath, fileName));
      const newImageURL = `http://localhost:5000/uploads/subcategory/${newFileName}`;

      req.body.image = newImageURL;
    }

    const updatedSubcategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedSubcategory });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ subCategory: id });
    const page = await Page.findById({ subCategories: id });

    if (product || page) {
      return res.status(404).json({
        success: false,
        msg: "Sub-category cannot be deleted as it is being used.",
      });
    }

    const subCategory = await SubCategory.findById(id);

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, msg: "No such sub-category found." });
    }

    const fileName = path.basename(subCategory.image);
    const folderPath = path.join(__dirname, "../uploads", "subcategory");
    const fileInFolder = await fs.readdir(folderPath);

    if (fileInFolder.includes(fileName)) {
      await fs.unlink(path.join(folderPath, fileName)); // unlink file ko delete kar denga.
    }
    await SubCategory.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, msg: " Sub-category deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllSubCategories,
  getAllSubCategoriesByCategorySlug,
  getAllSubCategoriesByCategoryId,
  getSinglelSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};

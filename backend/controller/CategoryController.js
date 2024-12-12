const Category = require("../modules/Category");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);

    if (!categories) {
      res.status(404).json({ success: false, msg: "NO such found category." });
    }

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    res.send("Add Category");
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    res.send("Update Category");
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    res.send("Delete Category");
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

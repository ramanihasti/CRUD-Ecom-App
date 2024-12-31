const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, minLength: 2, require: true },
  slug: {
    type: String,
    minLength: 2,
    unique: true,
    require: true,
  },
  image: { type: String, require: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

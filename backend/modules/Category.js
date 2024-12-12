const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 100, require: true },
  slug: {
    type: String,
    minLength: 2,
    maxLength: 100,
    unique: true,
    require: true,
  },
  image: { type: String, require: true },
});

const Category = mongooes.model("Category", categorySchema);

module.exports = Category;

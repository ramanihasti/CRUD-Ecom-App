const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  // _id: { type: mongoose.Types.ObjectId("6773e5bc8c8edae37094d07e") },
  // id: { type: mongoose.Types.ObjectId },
  name: { type: String, minLength: 2, required: true },
  slug: { type: String, minLength: 2, required: true, unique: true },
  image: { type: String, required: true },
  category: {
    type: [mongoose.Types.ObjectId],
    ref: "Category",
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;

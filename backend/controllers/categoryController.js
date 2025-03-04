const Category = require("../models/category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "name"); // Fetch all categories
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

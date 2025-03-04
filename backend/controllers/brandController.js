const Brand = require("../models/brand");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}, "name"); // Fetch all brands
    // const brands = await Brand.find({}); // Fetch all brands
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

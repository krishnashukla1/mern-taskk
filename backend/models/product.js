const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  colors: [String],
  rating: Number,
  gender: String,
  category: String,
  brand: String,
  occasion: String,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);  // 'Product' is the collection name in 'NewDb1' database

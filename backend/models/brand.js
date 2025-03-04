const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // categoryId: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category', // Reference to the Category model
  //   required: true,
  // }],
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;

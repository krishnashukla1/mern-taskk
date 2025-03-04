const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // brandId: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   // type: [String],
  //   ref: 'Brand',  
  // }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

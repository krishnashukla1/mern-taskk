const Product = require("../models/product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = "createdAt", order = "desc", category, brand, gender } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Build query filters
    const query = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (gender) query.gender = gender;

    // Fetch total count of products
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch paginated products
    const products = await Product.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Send paginated response
    res.status(200).json({
      page,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Search Products by Name, Category, or Brand
// exports.searchProducts = async (req, res) => {
//   try {
//     const { search, category, brand } = req.query;
//     let query = {};

//     // Case-insensitive search with regex
//     if (search) query.name = { $regex: new RegExp(search, "i") }; // Search product name 
//     if (category) query.category = { $regex: new RegExp(category, "i") }; // Search category
//     if (brand) query.brand = { $regex: new RegExp(brand, "i") }; // Search brand

//     const products = await Product.find(query);
//     res.json({ products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


exports.searchProducts = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: new RegExp(search, "i") }; // Ensure case-insensitive search
    }
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}; 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());   //if body is empty in postman then it will display  Body is Empty in POST/PUT
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));

// Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);



app.listen(PORT, () => console.log(`Server running on port no. ${PORT}`));



/*
GET-----http://localhost:5000/api/products?page=1&limit=10&sortBy=price&order=desc
        http://localhost:5000/api/products?page=2
        http://localhost:5000/api/products?search=laptop&brand=HP&category=electronics&minPrice=500&maxPrice=5000&sortBy=priceAsc
        http://localhost:5000/api/products?search=laptop

SEARCH---

GET-----  http://localhost:5000/api/products/search?search=samsung   SEARCH BY NAME
GET-----  http://localhost:5000/api/products/search?brand=Samsung     FILTER BY BRAND
GET-----  http://localhost:5000/api/products/search?category=Mobiles  FILTER BY CATEGORY

FILTER BY PRICE RANGE--- http://localhost:5000/api/products/search?minPrice=10000&maxPrice=50000


SORT BY PRICE--- http://localhost:5000/api/products/search?sortBy=priceAsc    (problem)
SORT BY RATING--- http://localhost:5000/api/products/search?sortBy=rating     (problem)




COMBINED FILTER--
GET----> http://localhost:5000/api/products/search?brand=Tommy%20Hilfiger&category=Accessories&minPrice=150&maxPrice=60000&sortBy=rating


Find "Samsung" brand "Mobiles" in the price range of ₹15,000 to ₹60,000, sorted by rating: (problem)
GET http://localhost:5000/api/products/search?brand=Samsung&category=Mobiles&minPrice=15000&maxPrice=60000&sortBy=rating







GET-- http://localhost:5000/

GET BY ID--- http://localhost:5000/api/products/{productId}


POST--- http://localhost:5000/api/products

{
  "name": "Samsung Galaxy S23",
  "price": 850,
  "category": "electronics",
  "colors":"Red",
  "brand": "Samsung",
  "gender": "unisex"
}

OR


{
  "name": "Men's Casual Shirt",
  "description": "A stylish and comfortable casual shirt for men.",
  "price": 1499,
  "colors": ["Blue", "Black", "White"],
  "rating": 4.5,
  "gender": "Male",
  "category": "Shirts",
  "brand": "Peter England",
  "occasion": "Casual",
  "image": "https://example.com/images/mens-casual-shirt.jpg"
}




PUT--- http://localhost:5000/api/products/{productId}

{
  "name": "Samsung Galaxy S23",
  "price": 850,
  "category": "electronics",
  "colors":"Red Red",
  "brand": "Samsung",
  "gender": "unisex"
}

DELETE--- http://localhost:5000/api/products/{productId}





GET BY CATEGORY---   http://localhost:5000/api/categories
GET BY BRANDS---   http://localhost:5000/api/brands
*/
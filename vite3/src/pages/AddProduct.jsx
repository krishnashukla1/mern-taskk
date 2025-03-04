import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    colors: "",
    rating: "",
    gender: "",
    category: "",
    brand: "",
    occasion: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/products", {
      ...product,
      colors: product.colors.split(",") 
    })
    .then(() => navigate("/"))
    .catch((error) => console.error(error));
  };

  return (
    //div
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh" }}>
  <h2>Add Product</h2>
  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", textAlign: "center" }}>
    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
    <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
    <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
    <input type="text" name="colors" placeholder="Colors (comma-separated)" onChange={handleChange} required />
    <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
    <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
    <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
    <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
    <input type="text" name="occasion" placeholder="Occasion" onChange={handleChange} required />
    <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required />
    <button type="submit">Add Product</button>
  </form>
</div>

  );
};

export default AddProduct;

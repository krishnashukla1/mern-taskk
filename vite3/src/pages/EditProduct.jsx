import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    image: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", textAlign: "center" }}>


        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="border p-2 w-full" />
        <input type="text" name="colors" value={product.colors} onChange={handleChange} placeholder="Colors (comma separated)" className="border p-2 w-full" />
        <input type="number" name="rating" value={product.rating} onChange={handleChange} placeholder="Rating" className="border p-2 w-full" />
        <input type="text" name="gender" value={product.gender} onChange={handleChange} placeholder="Gender" className="border p-2 w-full" />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="border p-2 w-full" />
        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" className="border p-2 w-full" />
        <input type="text" name="occasion" value={product.occasion} onChange={handleChange} placeholder="Occasion" className="border p-2 w-full" />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;

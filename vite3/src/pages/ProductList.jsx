import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../Search";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", { params: filters });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  //  Delete Product Function 
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId)); // Remove from UI
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product!");
    }
  };
  return (
    <div>
      {/* <h2>Products</h2> */}
      <Search onSearchResults={setProducts} /> {/* Integrate search */}

      <h2> Products</h2>
      {products.length > 0 ? (
        <table border="1" style={{ margin: "auto", textAlign: "center" }}>

          <thead>
            <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Colors</th>
              <th>Rating</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Occasion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₹{product.price}</td>
                <td>{Array.isArray(product.colors) ? product.colors.join(", ") : "N/A"}</td>
                <td>{product.rating}</td>
                <td>{product.gender}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.occasion}</td>
                {/* <td>
                  <Link to={`/edit-product/${product._id}`}>Edit</Link> |{" "}
                  <button onClick={() => deleteProduct(product._id)}>Delete</button>
                </td> */}


                <td>
                  <Link to={`/edit-product/${product._id}`} style={{ color: "blue", textDecoration: "none" }}>
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;

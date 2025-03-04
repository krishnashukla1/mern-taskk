import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data); 
      setShowCategories(!showCategories);
      setShowBrands(false);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/brands");
      setBrands(response.data);
      setShowBrands(!showBrands);
      setShowCategories(false);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff", position: "relative" }}>
      <Link to="/" style={{ marginRight: "15px", color: "#fff" }}>Products</Link>
      <Link to="/add-product" style={{ marginRight: "15px", color: "#fff" }}>Add Product</Link>

      {/* Categories Dropdown */}
      <div style={{ display: "inline-block", position: "relative" }}>
        <button onClick={fetchCategories} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          Categories ▼
        </button>
        {showCategories && (
          <ul style={{
            position: "absolute",
            top: "30px",
            left: "0",
            background: "#fff",
            color: "#000",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 10,
            minWidth: "150px"
          }}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} style={{ padding: "5px 0", cursor: "pointer" }}>
                  <Link to={`/categories/${category.name}`} style={{ textDecoration: "none", color: "#000" }}>
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <li style={{ padding: "5px 0" }}>No categories found</li>
            )}
          </ul>
        )}
      </div>

      {/* Brands Dropdown */}
      <div style={{ display: "inline-block", position: "relative", marginLeft: "15px" }}>
        <button onClick={fetchBrands} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          Brands ▼
        </button>
        {showBrands && (
          <ul style={{
            position: "absolute",
            top: "30px",
            left: "0",
            background: "#fff",
            color: "#000",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 10,
            minWidth: "150px"
          }}>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <li key={brand._id} style={{ padding: "5px 0", cursor: "pointer" }}>
                  <Link to={`/brands/${brand.name}`} style={{ textDecoration: "none", color: "#000" }}>
                    {brand.name}
                  </Link>
                </li>
              ))
            ) : (
              <li style={{ padding: "5px 0" }}>No brands found</li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

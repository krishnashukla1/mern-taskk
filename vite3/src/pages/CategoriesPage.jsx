import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching category products", error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div>
      <h2>Products in {category}</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => <li key={product._id}>{product.name}</li>)
        ) : (
          <p>No products found in this category</p>
        )}
      </ul>
    </div>
  );
};

export default CategoriesPage;

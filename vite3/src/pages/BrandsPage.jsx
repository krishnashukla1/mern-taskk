import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BrandsPage = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?brand=${brand}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching brand products", error);
      }
    };

    fetchProductsByBrand();
  }, [brand]);

  return (
    <div>
      <h2>Products of {brand}</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => <li key={product._id}>{product.name}</li>)
        ) : (
          <p>No products found for this brand</p>
        )}
      </ul>
    </div>
  );
};

export default BrandsPage;

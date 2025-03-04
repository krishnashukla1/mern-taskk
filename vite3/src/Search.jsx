import React, { useState } from "react";

const Search = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (category) queryParams.append("category", category);
      if (brand) queryParams.append("brand", brand);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);

      // const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);

      const response = await fetch(`http://localhost:5000/api/products/search?${queryParams}`);
      const data = await response.json();
      
      onSearchResults(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    <div>
      <h3>Search Products</h3>
      <input
        type="text"
        placeholder="Search by Product Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by Category..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by Brand..."
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={fetchProducts}>Search</button>
    </div>
  );
};

export default Search;

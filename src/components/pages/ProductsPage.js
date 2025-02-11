import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Select, Space } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import ProductCard from "./Productcard";

const { Search } = Input;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("priceAsc");
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    axios
      .get("https://edgistify-bsgv.onrender.com/api/get-all-products")
      .then((response) => {
        console.log(response, "fff");
        setProducts(response?.data?.products);
        setFilteredProducts(response?.data?.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    filterProducts(value, sortOption);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    filterProducts(searchQuery, value);
  };

  const filterProducts = (searchQuery, sortOption) => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "discount") {
      filtered.sort((a, b) => b.discount - a.discount);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex justify-between items-center mb-6 ">
        <Search
          placeholder="Search products..."
          className="w-60"
          value={searchQuery}
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Select
          defaultValue="priceAsc"
          value={sortOption}
          onChange={handleSortChange}
          style={{ width: 200 }}
          options={[
            { value: "priceAsc", label: "Price: Low to High" },
            { value: "priceDesc", label: "Price: High to Low" },
            { value: "discount", label: "Discount: High to Low" },
          ]}
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No data found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              setCartCount={setCartCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;

import { message } from "antd";
import generateCalendar from "antd/es/calendar/generateCalendar";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const ProductCard = ({ product, setCartCount }) => {
  const [isInCart, setIsInCart] = useState(false);
  const { incrementCartCount } = useCart();
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const discountPercentage = product.discount;

  const handleAddToCart = async () => {
    try {
      const user = localStorage.getItem("user");

      const userObject = JSON.parse(user);

      const userId = userObject?.user?.id;
      console.log(userId);

      if (!userId) {
        message.error(
          "User not logged in. Please log in to add products to the cart."
        );
        return;
      }

      const response = await axios.post(
        "https://edgistify-bsgv.onrender.com/api/add-to-cart",
        {
          userId,
          productId: product._id,
          quantity: 1,
        }
      );

      console.log(response, "res");
      if (response.status === 200) {
        message.success("Product added to cart successfully!");
        setIsInCart(true);
        incrementCartCount();
      } else if (response.status === 400) {
        message.error(response.data.message);
      } else if (response.status === 204) {
        message.error("Product is already in the cart");
        setIsInCart(true);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (error.response) {
        console.error("Backend Response:", error.response.data);
        message.error(error.response.data.message || "Failed to add product.");
      } else {
        message.error("Failed to add product.");
      }
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-md overflow-hidden relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-md group-hover:opacity-75"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-left">{product.name}</h3>

        <p className="text-gray-600 mt-2 text-left">{product.description}</p>

        <div className="flex items-center justify-start mt-4">
          <span className="text-xl font-bold text-green-700">
            ₹{discountedPrice.toFixed(2)}
          </span>

          <span className="line-through text-gray-800 font-medium  mx-2">
            ₹{product.price}
          </span>

          {discountPercentage > 0 && (
            <span className="text-red-500 font-bold text-xs ">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full opacity-50 group-hover:opacity-75 flex items-center justify-center">
        <button
          onClick={handleAddToCart}
          className={`bg-[#009444] text-white px-6 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
            isInCart ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
          disabled={isInCart}
        >
          {isInCart ? "Already in Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { message, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { AuthContext } from "../context/Authcontext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  console.log(token);

  const { decrementCartCount } = useCart();

  const fetchCartData = async () => {
    try {
      const user = localStorage.getItem("user");
      const userObject = JSON.parse(user);
      const userId = userObject?.user?.id;

      const response = await fetch(
        `https://edgistify-bsgv.onrender.com/api/user-cart/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart.items);
        calculateTotals(data.cart.items);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      message.error("An error occurred while fetching cart data.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (items) => {
    let price = 0;
    let discount = 0;

    items.forEach((item) => {
      const originalPrice = item.productId.price * item.quantity;
      const discountedPrice =
        originalPrice - (originalPrice * item.productId.discount) / 100;

      price += originalPrice;
      discount += originalPrice - discountedPrice;
    });

    setTotalPrice(price.toFixed(2));
    setTotalDiscount(discount.toFixed(2));
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const finalAmount = totalPrice - totalDiscount;
  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  //   console.log("Token after useEffect:", storedToken);
  // }, []);

  const handleOrderNow = async () => {
    try {
      if (!token) {
        message.error("Authorization failed. Please log in again.");
        return;
      }

      if (!address.trim()) {
        message.error("Please enter your shipping address.");
        return;
      }

      const response = await axios.post(
        "https://edgistify-bsgv.onrender.com/api/order",
        { shippingAddress: address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "res");
      if (response.status === 201) {
        setCartItems([]);
        setTotalPrice(0);
        setTotalDiscount(0);
        setAddress("");

        message.success("Order placed successfully! Redirecting...");
        navigate("/home");
        decrementCartCount();
      } else {
        message.error("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      message.error(
        error.response?.data?.message ||
          "An error occurred while placing the order."
      );
    }
  };

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 mt-12 min-h-screen flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const { productId, quantity, _id } = item;
                const discountedPrice =
                  productId.price -
                  (productId.price * productId.discount) / 100;

                return (
                  <div
                    key={_id}
                    className="flex items-center bg-white p-4 rounded-md border"
                  >
                    <img
                      src={productId.image}
                      alt={productId.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 ml-2">
                      <h3 className="font-semibold text-lg">
                        {productId.name}
                      </h3>
                      <p className="text-gray-600">Price: ₹{productId.price}</p>
                      <p className="text-green-500">
                        Discount: {productId.discount}%
                      </p>
                      <p className="font-bold">Quantity: {quantity}</p>
                      <p className="text-blue-600 font-semibold">
                        Discounted Price: ₹
                        {(discountedPrice * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full md:w-1/3 bg-white shadow-md rounded-md p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Total Discount:</span>
                <span className="text-green-500">-₹{totalDiscount}</span>
              </div>
              <hr />
              <div className="flex justify-between text-gray-900 font-bold">
                <span>Final Amount:</span>
                <span>₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Address Input Field */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">
                Shipping Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your shipping address"
                className="w-full p-2 border rounded-md mt-1"
              />
            </div>

            <button
              onClick={handleOrderNow}
              className="mt-6 w-full bg-[#009444] text-white py-2 rounded-md"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

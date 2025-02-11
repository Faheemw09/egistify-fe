import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { Modal } from "antd";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const { cartCount } = useCart();
  const handlelogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",

      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        logout();
        navigate("/");
      },
    });
  };
  return (
    <nav className="bg-[#009444] text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/home" className="text-2xl font-bold hover:text-gray-300">
            MyStore
          </Link>

          <ul className="flex space-x-6">
            <li>
              <Link
                to="/home"
                className="hover:text-[#fbb03f] transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-[#fbb03f] transition-colors duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#fbb03f] transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/home"
                className="hover:text-[#fbb03f]transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center space-x-6">
          <li className="list-none relative">
            <Link
              to="/cart"
              className="flex items-center hover:text-gray-300 transition-colors duration-200"
            >
              <span className="material-icons mr-2">cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          <li className="text-sm list-none">
            Welcome Back!{" "}
            <span className="font-semibold">{user?.user?.name}</span>
          </li>

          <li
            onClick={handlelogout}
            className="text-red-500 hover:text-red-400 transition-colors duration-200 list-none"
          >
            Logout
          </li>

          <li className="list-none">
            {/* <Link
              to="/admin/dashboard"
              className="flex items-center hover:text-gray-300 transition-colors duration-200"
            >
              <span className="material-icons mr-2">admin</span>
            </Link> */}
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const incrementCartCount = () => {
    setCartCount(cartCount + 1);
  };

  const decrementCartCount = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartCount,
        incrementCartCount,
        decrementCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

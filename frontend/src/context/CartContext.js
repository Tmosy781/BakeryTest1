import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // Function to add an item to the cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (!token) {
        alert('Please log in to add items to your cart.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8081/cart/add',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );

      setCart(response.data.cart);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart.');
    }
  };

  const value = {
    cart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

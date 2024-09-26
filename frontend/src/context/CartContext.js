// src/context/CartContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] }); // Initialize with an empty cart

  // Function to fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (!token) {
        setCart({ items: [] }); // Set cart to empty if no token
        return;
      }

      const response = await axios.get('http://localhost:8081/cart', {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      setCart(response.data); // Assuming backend sends the cart object directly
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [] }); // Set cart to empty on error
    }
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

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
        { productId, quantity }, // Payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );

      setCart(response.data.cart); // Update cart with the response
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart.');
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (!token) {
        alert('Please log in to manage your cart.');
        return;
      }

      const response = await axios.delete(`http://localhost:8081/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
      });

      setCart(response.data.cart); // Update cart with the response
      alert('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart.');
    }
  };

  // The context value that will be supplied to any descendants of this component
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContext;

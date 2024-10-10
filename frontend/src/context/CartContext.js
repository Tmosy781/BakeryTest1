// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  // Function to fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setCart({ items: [] });
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart({ items: [] });
    }
  };

  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to add an item to the cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please log in to add items to your cart.');
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      console.log('Adding to cart:', { productId, quantity }); // Debugging line
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart);
      alert('Item added to cart!');
    } catch (error) {
      if (error.response) {
        console.error('Error adding to cart:', error.response.data);
        alert(`Failed to add item to cart: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error adding to cart: No response received:', error.request);
        alert('Failed to add item to cart: No response from server.');
      } else {
        console.error('Error adding to cart:', error.message);
        alert(`Failed to add item to cart: ${error.message}`);
      }
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please log in to manage your cart.');
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data.cart);
      alert('Item removed from cart!');
    } catch (error) {
      if (error.response) {
        console.error('Error removing item from cart:', error.response.data);
        alert(`Failed to remove item from cart: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error removing item from cart: No response received:', error.request);
        alert('Failed to remove item from cart: No response from server.');
      } else {
        console.error('Error removing item from cart:', error.message);
        alert(`Failed to remove item from cart: ${error.message}`);
      }
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  // The context value that will be supplied to any descendants of this component
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

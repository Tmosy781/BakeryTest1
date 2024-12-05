import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

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

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please log in to add items to your cart.');
        return;
      }
  
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
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
      alert('Item added to cart!'); // Add this line to show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to add item to cart.');
      }
    }
  };

  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Please log in to manage your cart.');
        return;
      }

      // Updated URL to match backend route structure
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      const response = await axios.put(
        `${API_URL}/cart/update/${productId}/quantity`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to update item quantity.');
      }
    }
  };

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
    } catch (error) {
      console.error('Error removing item from cart:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to remove item from cart.');
      }
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setCart({ items: [] });
        return;
      }

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
      await axios.delete(`${API_URL}/cart/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart.');
    }
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    updateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
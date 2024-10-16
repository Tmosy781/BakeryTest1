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
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart.');
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
      alert('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart.');
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
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};


export default CartContext;
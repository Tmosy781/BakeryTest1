import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="text-center mt-8">Your cart is empty</div>;
  }

  // Calculate total price using the current quantities
  const totalPrice = cart.items.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  );

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      // Convert the string value to number
      const quantity = parseInt(newQuantity);
      await updateCartItemQuantity(productId, quantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity. Please try again.');
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        items: cart.items.map((item) => ({
          product: item.product._id || item.product,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      };

      const token = localStorage.getItem('accessToken');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Order created:', response.data);
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Your session has expired. Please log in again.');
        navigate('/login');
      } else if (err.response && err.response.status === 403) {
        setError('You are not authorized to perform this action.');
      } else {
        setError('Failed to submit order. Please try again.');
      }
      console.error('Error submitting order:', err);
    }
  };

  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ListGroup>
        {cart.items.map((item) => (
          <ListGroup.Item key={item._id} className="mb-4">
            <div className="flex items-center">
              {item.product.image && item.product.image.imgUrl ? (
                <img
                  src={item.product.image.imgUrl}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded mr-4">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.product.name || 'Product Name'}</h3>
                <div className="flex items-center gap-4 mb-2">
                  <label htmlFor={`quantity-${item.product._id}`} className="text-sm text-gray-600">
                    Quantity:
                  </label>
                  <select
                    id={`quantity-${item.product._id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                    className="border rounded px-3 py-1"
                  >
                    {/* Create array of numbers from 1 to 5 (default max) */}
                    {[...Array(5)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-600">
                    @ ${item.product.price.toFixed(2)} each
                  </span>
                  <span className="font-semibold">
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="danger"
                onClick={() => removeFromCart(item.product._id)}
                className="ml-4"
              >
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <Button 
          variant="primary"
          onClick={handleSubmitOrder}
          className="px-6 py-2"
        >
          Submit Order
        </Button>
      </div>
    </Container>
  );
};

export default CartPage;
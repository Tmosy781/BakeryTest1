import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex justify-center mt-14 items-center p-8">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/bakeryapp-a05a3.appspot.com/o/images%2F1733194781117_EmptyShoppingCartCat.png?alt=media&token=523cdd02-6542-4407-8d5b-6b7d0350c98b"
          alt="Empty Cart"
          className="max-w-md w-full h-auto rounded-3xl"
        />
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  );

  const handleSubmitOrder = async () => {
    try {
      console.log('Cart Items:', cart.items);

      const orderData = {
        items: cart.items.map((item) => ({
          product: item.product._id || item.product,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      };

      console.log('Order Data:', orderData);

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
    <Container>
      <h1>Your Cart</h1>
      <ListGroup>
        {cart.items.map((item) => (
          <ListGroup.Item key={item._id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.product.image && item.product.image.imgUrl ? (
                <img
                  src={item.product.image.imgUrl}
                  alt={item.product.name}
                  style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                />
              ) : (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#ccc',
                    marginRight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  No Image
                </div>
              )}
              <div style={{ flex: 1 }}>
                <strong>{item.product.name || 'Product Name'}</strong>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
              <Button
                variant="danger"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button variant="primary" onClick={handleSubmitOrder}>
        Submit Order
      </Button>
    </Container>
  );
};

export default CartPage;
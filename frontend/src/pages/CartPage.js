// src/pages/CartPage.js

import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button } from 'react-bootstrap';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Container>
      <h1>Your Cart</h1>
      <ListGroup>
        {cart.items.map((item) => (
          <ListGroup.Item key={item.product._id}>
            <div>
              <strong>{item.product.name}</strong>
            </div>
            <div>Quantity: {item.quantity}</div>
            <div>Price: ${(item.product.price * item.quantity).toFixed(2)}</div>
            <Button
              variant="danger"
              onClick={() => removeFromCart(item.product._id)}
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <Button variant="primary" href="/checkout">
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;

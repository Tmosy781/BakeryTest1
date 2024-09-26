// src/pages/CartPage.js

import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, ListGroup, Button } from 'react-bootstrap';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  // Debugging: Log cart data to verify structure
  console.log('Cart Data:', cart);

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <Container>
      <h1>Your Cart</h1>
      <ListGroup>
        {cart.items.map((item) => (
          <ListGroup.Item key={item._id}> {/* Use item's own _id for uniqueness */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Display Product Image */}
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
              {/* Display Product Details */}
              <div style={{ flex: 1 }}>
                <strong>{item.product.name || 'Product Name'}</strong>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
              {/* Remove Button */}
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
      <Button variant="primary" href="/checkout">
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;

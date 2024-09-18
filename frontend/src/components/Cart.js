import React from 'react';

const Cart = ({ cartId }) => {
  return (
    <div>
      <h2>Cart ID: {cartId}</h2>
      <p>This is the cart component. Here you can view and manage the items in your cart.</p>
    </div>
  );
};

export default Cart;
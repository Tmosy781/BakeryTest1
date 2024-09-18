import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ match }) => {
  const { cartId } = match.params;
  return (
    <div>
      <h1>Cart Page</h1>
      <p>This is the cart page. Here you can view and manage the items in your cart.</p>
      <Cart cartId={cartId} />
    </div>
  );
};

export default CartPage;
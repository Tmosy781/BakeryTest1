import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCartId = localStorage.getItem('cartId');
    console.log('Stored cartId:', storedCartId);  // Debugging log
    if (token) {
      setIsAuthenticated(true);
      setCartId(storedCartId);  // Ensure this is correctly setting the cartId
    }
  }, []);
  

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart/:cartId" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage cartId={cartId} />} />
        <Route path="/login" element={<LoginPage setCartId={setCartId} />} />
      </Routes>
    </>
  );
}

export default App;
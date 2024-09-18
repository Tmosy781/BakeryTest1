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
    if (token) {
      setIsAuthenticated(true);
      setCartId(storedCartId);
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
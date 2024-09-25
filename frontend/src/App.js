import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import ImageUpload from './components/ImageUpload';
import ImagesDisplay from './components/ImagesDisplay';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <CartProvider>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/loginPage"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/images" element={<ImagesDisplay />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import ImageUpload from './components/ImageUpload'; // Import ImageUpload component
import ImagesDisplay from './components/ImagesDisplay'; // Import ImagesDisplay component
import { createCart } from './services/api'; // Import the createCart function

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCartId = localStorage.getItem('cartId');
    console.log('Stored cartId:', storedCartId);
    if (token) {
      setIsAuthenticated(true);
      if (storedCartId) {
        setCartId(storedCartId);
      } else {
        initializeCart();
      }
    }
  }, []);

  const initializeCart = async () => {
    try {
      const newCart = await createCart();
      setCartId(newCart._id);
      localStorage.setItem('cartId', newCart._id);
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage cartId={cartId} />} />
        <Route path="/cart" element={<CartPage cartId={cartId} />} />
        <Route path="/loginPage" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/upload" element={<ImageUpload />} /> {/* Add route for ImageUpload */}
        <Route path="/images" element={<ImagesDisplay />} /> {/* Add route for ImagesDisplay */}
      </Routes>
    </>
  );
}

export default App;
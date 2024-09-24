import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import ImageUpload from './components/ImageUpload'; // Import ImageUpload component
import ImagesDisplay from './components/ImagesDisplay'; // Import ImagesDisplay component


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/loginPage" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/upload" element={<ImageUpload />} /> {/* Add route for ImageUpload */}
        <Route path="/images" element={<ImagesDisplay />} /> {/* Add route for ImagesDisplay */}
      </Routes>
    </>
  );
}

export default App;
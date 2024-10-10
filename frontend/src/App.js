import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderPage from './pages/OrderPage'; // Corrected import path
import OrderDetailPage from './pages/OrderDetailPage'; // Corrected import path
import PrivateRoute from './components/PrivateRoute'; // New component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <CartProvider>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Protected Routes */}
        <Route
          path="/orders"
          element={
            <PrivateRoute element={OrderPage} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <PrivateRoute element={OrderDetailPage} isAuthenticated={isAuthenticated} />
          }
        />
      </Routes>
    </CartProvider>
  );
}

export default App;

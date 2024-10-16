import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderPage from './pages/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PrivateRoute from './components/PrivateRoute';
import getUserInfo from './utilities/decodeJwt';
import './background-styles.css'; // Updated import for the renamed CSS file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    setIsAuthenticated(!!userInfo);
  }, []);

  const checkIsAdmin = () => {
    const userInfo = getUserInfo();
    return userInfo ? userInfo.isAdmin : false;
  };

  return (
    <CartProvider>
      <div className="min-h-screen pastel-rainbow-gradient">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isAdmin={checkIsAdmin()} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage isAdmin={checkIsAdmin()} />} />
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
      </div>
    </CartProvider>
  );
}

export default App;
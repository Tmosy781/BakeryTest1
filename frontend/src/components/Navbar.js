import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    navigate("/");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-fuchsia-100 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-black hover:text-gray-700">Home</Link>
          <Link to="/products" className="text-black hover:text-gray-700">Products</Link>
          <Link to="/about" className="text-black hover:text-gray-700">About Us</Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="text-black hover:text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                ({itemCount})
              </Link>
              <Link to="/orders" className="text-black hover:text-gray-700">Orders</Link>
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="text-black hover:text-gray-700 focus:outline-none"
                >
                  Profile
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="text-black hover:text-gray-700">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
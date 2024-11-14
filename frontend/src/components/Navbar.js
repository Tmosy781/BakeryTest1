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
        <div className="flex items-center space-x-4">
          <div className="rounded-full overflow-hidden shadow-sm p-.5 bg-white/50 backdrop-blur-sm">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/bakeryapp-a05a3.appspot.com/o/images%2F1731553877436_SugarPlumIcon.png?alt=media&token=408e0e8c-db8e-4c6c-bddc-60f14feccd20"
              alt="Sugar Plum Icon"
              className="h-10 w-14 object-cover rounded-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="no-underline text-xl md:text-xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="no-underline text-xl md:text-xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="no-underline text-xl md:text-xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="text-xl md:text-2xl font-bold text-pink-800 hover:text-pink-600 flex items-center transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                ({itemCount})
              </Link>
              <Link 
                to="/orders" 
                className="text-xl md:text-2xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200"
              >
                Orders
              </Link>
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="text-xl md:text-2xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200 focus:outline-none"
                >
                  Profile
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-lg font-bold text-pink-800 hover:bg-pink-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="no-underline text-xl md:text-xl font-bold text-pink-800 hover:text-pink-600 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
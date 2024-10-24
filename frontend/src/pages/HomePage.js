import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-pink-800 animate-fade-up animate-once">
            Welcome to Sugar Plum Bakery
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto animate-fade-up animate-delay-150">
            Discover our handcrafted pastries, artisanal breads, and delectable desserts made with love and the finest ingredients.
          </p>
          <div className="flex justify-center gap-4 animate-fade-up animate-delay-300">
            <Link
              to="/products"
              className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300 text-lg font-semibold"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-pink-600 text-pink-600 rounded-full hover:bg-pink-50 transition duration-300 text-lg font-semibold"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Cakes', 'Cookies', 'Breads', 'Pastries'].map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category}</h3>
                <Link
                  to="/products"
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  View All →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-pink-50 py-16 px-4 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Place an Order?</h2>
          <p className="text-lg mb-8 text-gray-600">
            Join us in creating sweet memories with our freshly baked goods.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300 text-lg font-semibold"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
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

      <div 
  className="relative max-w-7xl mx-auto px-4 py-16"
  style={{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('https://firebasestorage.googleapis.com/v0/b/bakeryapp-a05a3.appspot.com/o/images%2F1731597082840_FallLeaves.png?alt=media&token=ba3d60f4-52a1-4de3-974b-536c375f3d99')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '1rem',
  }}
>
  <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Seasonal Specialties</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
    {['Pumpkin Muffins', 'Apple Cinnamon Bread', 'Snickerdoodle Cookies'].map((category) => (
      <div key={category} className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
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
      <div className="bg-pink-50 rounded-xl py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
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
          <div className="md:w-1/2 md:pl-8">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/bakeryapp-a05a3.appspot.com/o/images%2F1731553920023_counterscene.png?alt=media&token=4f0e3b4c-c699-441d-97a8-16bb4c5f9d2b"
              alt="Bakery Counter Scene"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
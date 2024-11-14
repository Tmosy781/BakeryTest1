// src/components/Footer.js
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-fuchsia-100 text-black text-sm">
      <div className="container mx-auto py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            <span className="font-semibold">Sugar Plum</span> - Delightful treats for every occasion.
          </div>
          
          <div className="w-full sm:w-auto mb-2 sm:mb-0">
            Contact: info@sugarplum.com | (123) 456-7890
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end space-x-4">
            <a href="https://www.facebook.com" className="text-black hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="text-black hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="text-black hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="text-center mt-2">
          <p>&copy; {new Date().getFullYear()} Sugar Plum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
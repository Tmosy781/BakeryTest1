import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-800 mb-4 animate-fade-up animate-once">
            About Sugar Plum
          </h1>
          <div className="w-24 h-1 bg-pink-400 mx-auto mb-8"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-12 bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85)), url('https://firebasestorage.googleapis.com/v0/b/bakeryapp-a05a3.appspot.com/o/images%2F1733169675487_AboutUsChibi.png?alt=media&token=7b3154d7-f04b-4021-8e08-60a6c8986b08')`,
        }}>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Welcome to Sugar Plum! I'm Jeudy, and I'm delighted you've stopped by. For over a decade, 
              I've been pursuing my passion for baking, transforming my home kitchen into a creative sanctuary 
              where each recipe becomes a work of art.
            </p>

            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              To me, baking is more than just following recipes – it's an artistic journey where flavors 
              and aesthetics come together to create something truly special. Every treat that comes from 
              my kitchen is crafted with attention to both taste and presentation, because I believe we 
              eat with our eyes first!
            </p>

            <p className="text-lg text-gray-800 mb-8 leading-relaxed">
              We're conveniently located just 20 minutes north of Boston, bringing handcrafted sweetness 
              to our local community. Each creation is made with love, care, and a sprinkle of creativity.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-pink-50 rounded-lg p-8 animate-fade-up animate-delay-300">
          <p className="text-xl text-pink-800 font-semibold mb-6">
            Ready to experience the magic of Sugar Plum?
          </p>
          <Link 
            to="/products"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300 text-lg font-semibold no-underline"
          >
            Browse Our Treats
          </Link>
        </div>

        {/* Optional Contact Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">📍 Located just 20 minutes north of Boston</p>
          <p>✨ Creating sweet memories, one treat at a time</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
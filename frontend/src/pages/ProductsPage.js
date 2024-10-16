import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/products');
        setProducts(response.data);
        // Initialize quantities state
        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product) => {
    addToCart(product._id, quantities[product._id]);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Our Bakery Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {product.image && (
              <img className="w-full h-46 object-cover" src={product.image.imgUrl} alt={product.name} />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Ingredients: {product.ingredients.join(', ')}</p>
              <p className="text-sm text-gray-500">Allergens: {product.allergens.join(', ')}</p>
              <p className="text-sm text-gray-500">In Stock: {product.inStock ? 'Yes' : 'No'}</p>
              <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              
              <div className="mt-4">
                <label htmlFor={`quantity-${product._id}`} className="block text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <select
                  id={`quantity-${product._id}`}
                  value={quantities[product._id]}
                  onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {[...Array(product.maxOrderQuantity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductsPage = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [editMode, setEditMode] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/products');
        setProducts(response.data);
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

  const toggleEditMode = (productId) => {
    setEditMode(prev => ({ ...prev, [productId]: !prev[productId] }));
    setEditedProduct(products.find(p => p._id === productId));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:8081/api/products/${editedProduct._id}`, editedProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.map(p => p._id === editedProduct._id ? editedProduct : p));
      setEditMode(prev => ({ ...prev, [editedProduct._id]: false }));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Our Bakery Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {product.image && (
              <img className="w-full h-47 object-cover" src={product.image.imgUrl} alt={product.name} />
            )}
            <div className="p-4">
              {editMode[product._id] ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editedProduct.description}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                  <button type="button" onClick={() => toggleEditMode(product._id)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className="text-sm text-gray-500">Ingredients: {product.ingredients.join(', ')}</p>
                  <p className="text-sm text-gray-500">Allergens: {product.allergens.join(', ')}</p>
                  <p className="text-lg font-bold mt-2">
                    ${typeof product.price === 'number'
                      ? product.price.toFixed(2)
                      : 'Price not available'}
                  </p>

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

                  {isAdmin && (
                    <button
                      onClick={() => toggleEditMode(product._id)}
                      className="mt-2 w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit Product
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
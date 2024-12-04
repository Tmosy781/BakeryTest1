import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductsPage = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [editMode, setEditMode] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Other',
    ingredients: '',
    allergens: '',
    image: '',
    maxOrderQuantity: 5
  });

  const categories = ['All', 'Cakes', 'Cookies', 'Breads', 'Pastries', 'Seasonal', 'Other'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, imagesRes] = await Promise.all([
          axios.get('http://localhost:8081/api/products'),
          axios.get('http://localhost:8081/api/images')
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setAvailableImages(imagesRes.data);
        
        const initialQuantities = productsRes.data.reduce((acc, product) => {
          acc[product._id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

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

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const productData = {
        ...newProduct,
        ingredients: newProduct.ingredients.split(',').map(i => i.trim()),
        allergens: newProduct.allergens.split(',').map(a => a.trim()),
        price: parseFloat(newProduct.price),
        imageId: newProduct.image
      };
  
      await axios.post(
        'http://localhost:8081/api/products',
        productData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // Fetch fresh data after creating new product
      const updatedProductsRes = await axios.get('http://localhost:8081/api/products');
      setProducts(updatedProductsRes.data);
      setFilteredProducts(selectedCategory === 'All' ? 
        updatedProductsRes.data : 
        updatedProductsRes.data.filter(p => p.category === selectedCategory)
      );
  
      setShowCreateModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'Other',
        ingredients: '',
        allergens: '',
        image: '',
        maxOrderQuantity: 5
      });
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.response?.data?.message || 'Error creating product');
    }
  };

  return (
    <div className="container text-center mx-auto px-4">
      <div className="text-center justify-between items-center mb-6">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-800 mb-4 my-8">Our Bakery Products</h1>
        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
          >
            Create New Product
          </button>
        )}
      </div>

      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                <input
                  type="text"
                  value={newProduct.ingredients}
                  onChange={(e) => setNewProduct({...newProduct, ingredients: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Allergens (comma-separated)</label>
                <input
                  type="text"
                  value={newProduct.allergens}
                  onChange={(e) => setNewProduct({...newProduct, allergens: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <select
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select an image</option>
                  {availableImages.map((image) => (
                    <option key={image._id} value={image._id}>
                      {image.imgName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Max Order Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newProduct.maxOrderQuantity}
                  onChange={(e) => setNewProduct({...newProduct, maxOrderQuantity: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
            {product.image && (
              <img className="w-full h-47 object-cover" src={product.image.imgUrl} alt={product.name} />
            )}
            <div className="p-4 flex flex-col flex-grow">
              {editMode[product._id] ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col flex-grow">
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border rounded text-center"
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
                  <button type="button" onClick={() => toggleEditMode(product._id)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">Cancel</button>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-center mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                  <p className="text-sm text-gray-500 mb-1">Ingredients: {product.ingredients.join(', ')}</p>
                  <p className="text-sm text-red-400 mb-2">Allergens: {product.allergens.join(', ')}</p>
                  
                  <div className="mt-auto space-y-2">
                    <p className="text-lg font-bold text-left">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : 'Price not available'}
                    </p>
                    <div className="flex items-center justify-between">
                      <label htmlFor={`quantity-${product._id}`} className="text-sm font-medium text-gray-700">
                        Quantity:
                      </label>
                      <select
                        id={`quantity-${product._id}`}
                        value={quantities[product._id]}
                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                        className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => toggleEditMode(product._id)}
                        className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                      >
                        Edit Product
                      </button>
                    )}
                  </div>
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
import React, { useState, useEffect } from 'react';
import { getProducts, addProductToCart } from '../api/productApi';
import { ProductsContainer, ProductCard } from '../styles/ProductsPageStyles';

const ProductsPage = ({ cartId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!cartId) {
      alert('You need to be logged in to add products to the cart');
      return;
    }

    try {
      await addProductToCart(cartId, productId, 1);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
  };

  console.log('cartId:', cartId); // Add this line for debugging

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Our Baked Products</h1>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <img src={`/path/to/images/${product.imageName}`} alt={product.name} style={{ width: '100%' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
          </ProductCard>
        ))}
      </ProductsContainer>
    </div>
  );
};

export default ProductsPage;
import React, { useEffect, useState } from 'react';
import { fetchProducts, addProductToCart } from '../services/api';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  width: 200px;
  text-align: center;
`;

const ProductsPage = ({ cartId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
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
      alert('Failed to add product to cart');
    }
  };

  return (
    <div>
      <h1>Our Baked Products</h1>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
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
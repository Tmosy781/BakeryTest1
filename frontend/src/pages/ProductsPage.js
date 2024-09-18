import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
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

const ProductsPage = () => {
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
          </ProductCard>
        ))}
      </ProductsContainer>
    </div>
  );
};

export default ProductsPage;
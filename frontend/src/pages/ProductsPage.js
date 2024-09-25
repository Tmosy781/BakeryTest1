import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Our Bakery Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              {product.image && (
                <Card.Img variant="top" src={product.image.imgUrl} alt={product.name} />
              )}
              <Card.Body>
                <Card.Title as="div">
                  <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as="div">
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Ingredients: {product.ingredients.join(', ')}</p>
                  <p>Allergens: {product.allergens.join(', ')}</p>
                  <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                  <p>Quantity: {product.quantity}</p>
                </Card.Text>
                <Card.Text as="h3">${product.price.toFixed(2)}</Card.Text>
                <Button
                  onClick={() => addToCart(product._id)} // Pass product._id
                  variant="primary"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;

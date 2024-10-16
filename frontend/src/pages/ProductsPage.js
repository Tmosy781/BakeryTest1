import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
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
                </Card.Text>
                <Card.Text as="h3">${product.price.toFixed(2)}</Card.Text>
                <Form.Group>
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    as="select"
                    value={quantities[product._id]}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                  >
                    {[...Array(product.maxOrderQuantity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="primary"
                  disabled={!product.inStock}
                  className="mt-2"
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

export default ProductsPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

        const response = await axios.get(`${API_URL}/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to fetch order details. Please try again.');
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!order) {
    return <div>Loading order details...</div>;
  }

  return (
    <Container>
      <h1>Order Details</h1>
      <h5>Order ID: {order._id}</h5>
      <p>Status: {order.status}</p>
      <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
      <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>

      <ListGroup>
        {order.items.map((item) => (
          <ListGroup.Item key={item._id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.product.image && item.product.image.imgUrl ? (
                <img
                  src={item.product.image.imgUrl}
                  alt={item.product.name}
                  style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                />
              ) : (
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#ccc',
                    marginRight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  No Image
                </div>
              )}
              <div style={{ flex: 1 }}>
                <strong>{item.product.name || 'Product Name'}</strong>
                <div>Quantity: {item.quantity}</div>
                <div>Price: ${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back to Orders
      </Button>
    </Container>
  );
};

export default OrderDetailPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

        const response = await axios.get(`${API_URL}/orders/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Container>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <div>You have no orders.</div>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order._id}>
              <div>
                <h5>Order ID: {order._id}</h5>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                <Button variant="primary" onClick={() => handleViewOrder(order._id)}>
                  View Details
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default OrderPage;

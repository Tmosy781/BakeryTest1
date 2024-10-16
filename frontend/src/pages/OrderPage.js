import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Card, Alert, Button, Form } from 'react-bootstrap';
import getUserInfo from '../utilities/decodeJwt';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('You must be logged in to view orders.');
          return;
        }

        const userInfo = getUserInfo();
        setIsAdmin(userInfo && userInfo.isAdmin);

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
        
        const response = await axios.get(
          isAdmin ? `${API_URL}/orders` : `${API_URL}/orders/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('Failed to update order status. Please try again.');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

      await axios.put(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Canceled' } : order
      ));
    } catch (err) {
      console.error('Error canceling order:', err);
      setError('Failed to cancel order. Please try again.');
    }
  };

  return (
    <Container>
      <h1>{isAdmin ? 'All Orders' : 'Your Orders'}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order._id}>
              <Card>
                <Card.Header>
                  <h5>Order ID: {order._id}</h5>
                  {isAdmin && <p>User: {order.user.username || 'Unknown'}</p>}
                </Card.Header>
                <Card.Body>
                  <p>Status: {order.status}</p>
                  <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                  <h6>Items:</h6>
                  <ListGroup variant="flush">
                    {order.items.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <p>Product: {item.product.name || 'Unknown Product'}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${((item.product.price || 0) * item.quantity).toFixed(2)}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  {isAdmin && (
                    <Form.Group className="mt-3">
                      <Form.Label>Update Status:</Form.Label>
                      <Form.Control
                        as="select"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      >
                        <option>Order Submitted</option>
                        <option>In the Oven</option>
                        <option>Complete</option>
                        <option>Canceled</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                  {!isAdmin && order.status === 'Order Submitted' && (
                    <Button 
                      variant="danger" 
                      className="mt-3"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default OrderPage;
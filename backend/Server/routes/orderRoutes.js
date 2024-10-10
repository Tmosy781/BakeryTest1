const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware');
const orderController = require('../controllers/orderController');

// Get all orders (admin only)
router.get('/', authenticateToken, isAdmin, orderController.getAllOrders);

// Get orders for the authenticated user
router.get('/user', authenticateToken, orderController.getOrdersByUser);

// Get a specific order
router.get('/:id', authenticateToken, orderController.getOrder);

// Create a new order
router.post('/', authenticateToken, orderController.createOrder);

// Update order status (admin only)
router.put('/:id/status', authenticateToken, isAdmin, orderController.updateOrderStatus);

// Delete an order (admin only)
router.delete('/:id', authenticateToken, isAdmin, orderController.deleteOrder);

module.exports = router;
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware');
const cartController = require('../controllers/cartController');

// Cart routes
router.get('/', authenticateToken, cartController.getCart);
router.post('/add', authenticateToken, cartController.addToCart);
router.put('/update', authenticateToken, cartController.updateCart);
router.put('/update/:productId/quantity', authenticateToken, cartController.updateItemQuantity);
router.delete('/remove/:productId', authenticateToken, cartController.removeItem);
router.delete('/clear', authenticateToken, cartController.clearCart);

module.exports = router;
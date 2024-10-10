// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Image = require('../models/imageModel');
const { authenticateToken } = require('../middleware');
const cartController = require('../controllers/cartController');

// GET the current user's cart
router.get('/', authenticateToken, cartController.getCart);

// POST add an item to the cart
router.post('/add', authenticateToken, cartController.addToCart);

// PUT update item quantities in the cart
router.put('/update', authenticateToken, cartController.updateCart);

// DELETE remove an item from the cart
router.delete('/remove/:productId', authenticateToken, cartController.removeItem);

// DELETE clear the cart
router.delete('/clear', authenticateToken, cartController.clearCart);

module.exports = router;

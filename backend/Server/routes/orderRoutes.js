const express = require('express');
const { createOrderFromCart } = require('../controllers/orderController'); // Adjust the path as necessary

const router = express.Router();

router.post('/from-cart/:cartId', createOrderFromCart);

module.exports = router;
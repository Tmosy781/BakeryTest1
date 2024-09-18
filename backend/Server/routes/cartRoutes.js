const express = require('express');
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  addProductToCart // Import the new function
} = require('../controllers/cartController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.post('/add-product', addProductToCart); // Add the new route

module.exports = router;
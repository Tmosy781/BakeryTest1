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
router.post('/:cartId/add', addProductToCart); // Update the route to match the frontend endpoint

module.exports = router;
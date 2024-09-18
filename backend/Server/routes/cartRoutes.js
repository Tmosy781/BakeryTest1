const express = require('express');
const cartController = require('../controllers/cartController'); // Import the cart controller
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  addProductToCart // Import the function
} = require('../controllers/cartController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.post('/carts/:id/add', cartController.addProductToCart);

module.exports = router;
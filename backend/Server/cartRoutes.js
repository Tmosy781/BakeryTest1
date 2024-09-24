const express = require('express');
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart, // Ensure this function is defined and imported
  deleteCart,
  addProductToCart
} = require('../controllers/cartController'); // Adjust the path as necessary

const router = express.Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.put('/:id', updateCart); // Ensure this route has a valid callback function
router.delete('/:id', deleteCart);
router.post('/:id/add', addProductToCart);

module.exports = router;
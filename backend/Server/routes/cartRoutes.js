// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const { authenticateToken } = require('../middleware');

// GET the current user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging line
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add an item to the cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging line
    const { productId, quantity } = req.body;

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // If cart exists, check if product is already in cart
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        // If product exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product doesn't exist in cart, add it
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // If no cart exists, create one
      cart = new Cart({
        user: req.user.id,
        items: [{ product: productId, quantity }]
      });
    }

    const updatedCart = await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update item quantities in the cart
router.put('/update', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging line
    const { items } = req.body; // Expecting an array of { productId, quantity }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Update quantities
    items.forEach(item => {
      const cartItem = cart.items.find(ci => ci.product.toString() === item.productId);
      if (cartItem) {
        cartItem.quantity = item.quantity;
      }
    });

    const updatedCart = await cart.save();
    res.status(200).json({ message: 'Cart updated', cart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE remove an item from the cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging line
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);

    const updatedCart = await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE clear the cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    console.log('req.user:', req.user); // Debugging line
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

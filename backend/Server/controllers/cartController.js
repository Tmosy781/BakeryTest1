// controllers/cartController.js

const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Get the current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price image',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    if (!cart) return res.status(200).json({ items: [] }); // Return empty cart if none exists
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
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
        items: [{ product: productId, quantity }],
      });
    }

    const updatedCart = await cart.save();

    // Populate the updated cart before sending the response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ message: 'Item added to cart', cart: populatedCart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update item quantities in the cart
exports.updateCart = async (req, res) => {
  try {
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

    // Populate the updated cart before sending the response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ message: 'Cart updated', cart: populatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(400).json({ message: error.message });
  }
};

// Remove an item from the cart
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);

    const updatedCart = await cart.save();

    // Populate the updated cart before sending the response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ message: 'Item removed from cart', cart: populatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: error.message });
  }
};

// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: error.message });
  }
};

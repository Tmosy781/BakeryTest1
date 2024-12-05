// controllers/cartController.js
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

/**
 * Get the current user's cart with populated product information
 * This controller fetches the cart and populates detailed product info including images
 */
exports.getCart = async (req, res) => {
  try {
    // Find cart for current user and populate product details
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price image maxOrderQuantity', // Include maxOrderQuantity
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    // If no cart exists, return empty cart structure
    if (!cart) return res.status(200).json({ items: [] });
    
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add a new item to the cart or update its quantity if it already exists
 * Validates product existence and handles cart creation if needed
 */
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // First validate that the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate quantity against maxOrderQuantity
    if (quantity > product.maxOrderQuantity) {
      return res.status(400).json({ 
        message: `Cannot add more than ${product.maxOrderQuantity} units of this item`
      });
    }

    // Find or create cart for the user
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // Cart exists, check if product is already in cart
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        const newQuantity = cart.items[itemIndex].quantity + quantity;
        
        // Check if new total quantity exceeds maximum
        if (newQuantity > product.maxOrderQuantity) {
          return res.status(400).json({ 
            message: `Total quantity cannot exceed ${product.maxOrderQuantity} units`
          });
        }
        
        cart.items[itemIndex].quantity = newQuantity;
      } else {
        // Product not in cart, add new item
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // Create new cart with first item
      cart = new Cart({
        user: req.user.id,
        items: [{ product: productId, quantity }],
      });
    }

    // Save cart changes
    const updatedCart = await cart.save();

    // Populate cart with product details for response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image maxOrderQuantity',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ 
      message: 'Item added to cart successfully', 
      cart: populatedCart 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update the quantity of a specific item in the cart
 * Validates the new quantity against product maxOrderQuantity
 */
exports.updateItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Validate product and get maxOrderQuantity
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate quantity against maxOrderQuantity
    if (quantity > product.maxOrderQuantity) {
      return res.status(400).json({ 
        message: `Quantity cannot exceed ${product.maxOrderQuantity} units`
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and update item quantity
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    const updatedCart = await cart.save();

    // Populate cart for response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image maxOrderQuantity',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ 
      message: 'Item quantity updated successfully', 
      cart: populatedCart 
    });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove a specific item from the cart
 */
exports.removeItem = async (req, res) => {
  try {
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item from items array
    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    const updatedCart = await cart.save();

    // Populate cart for response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image maxOrderQuantity',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ 
      message: 'Item removed from cart successfully', 
      cart: populatedCart 
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Clear all items from the cart
 * This removes the entire cart document for the user
 */
exports.clearCart = async (req, res) => {
  try {
    // Delete the entire cart document
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

/**
 * Batch update multiple items in the cart
 * This allows updating quantities for multiple items at once
 */
exports.updateCart = async (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }
    
    // Find user's cart
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Validate and update each item
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ 
          message: `Product ${item.productId} not found` 
        });
      }

      if (item.quantity > product.maxOrderQuantity) {
        return res.status(400).json({ 
          message: `Quantity for ${product.name} cannot exceed ${product.maxOrderQuantity} units` 
        });
      }

      const cartItem = cart.items.find(
        ci => ci.product.toString() === item.productId
      );
      if (cartItem) {
        cartItem.quantity = item.quantity;
      }
    }

    const updatedCart = await cart.save();

    // Populate cart for response
    const populatedCart = await Cart.findById(updatedCart._id)
      .populate({
        path: 'items.product',
        select: 'name price image maxOrderQuantity',
        populate: {
          path: 'image',
          model: 'Image',
          select: 'imgUrl',
        },
      })
      .exec();

    res.status(200).json({ 
      message: 'Cart updated successfully', 
      cart: populatedCart 
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(400).json({ message: error.message });
  }
};
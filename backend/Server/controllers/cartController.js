const Cart = require('../models/cartModel'); // Ensure the correct path to the Cart model

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate('items.productId');
    const cartsWithTotalPrice = carts.map(cart => ({
      ...cart.toObject(),
      totalPrice: cart.totalPrice
    }));
    res.status(200).json(cartsWithTotalPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const cartWithTotalPrice = {
      ...cart.toObject(),
      totalPrice: cart.totalPrice
    };
    res.status(200).json(cartWithTotalPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  console.log('Request body:', req.body); // Debugging log
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    const newCartWithTotalPrice = {
      ...newCart.toObject(),
      totalPrice: newCart.totalPrice
    };
    console.log('New cart created:', newCartWithTotalPrice); // Debugging log
    res.status(201).json(newCartWithTotalPrice);
  } catch (error) {
    console.error('Error creating cart:', error); // Debugging log
    res.status(400).json({ message: error.message });
  }
};

// Update a cart
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const updatedCartWithTotalPrice = {
      ...cart.toObject(),
      totalPrice: cart.totalPrice
    };
    res.status(200).json(updatedCartWithTotalPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product to the cart
const addProductToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const cartId = req.params.id;

  console.log('cartId:', cartId); // Debugging log
  console.log('productId:', productId); // Debugging log
  console.log('quantity:', quantity); // Debugging log

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (productIndex > -1) {
      // Product already in cart, update quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // Product not in cart, add new item
      cart.items.push({ productId, quantity });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding product to cart:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart, // Ensure this function is exported
  addProductToCart,
  // other exports...
};
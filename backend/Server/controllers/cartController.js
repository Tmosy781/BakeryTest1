const Cart = require('../models/cartModel');

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
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    const newCartWithTotalPrice = {
      ...newCart.toObject(),
      totalPrice: newCart.totalPrice
    };
    res.status(201).json(newCartWithTotalPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing cart by ID
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('items.productId');
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const updatedCartWithTotalPrice = {
      ...updatedCart.toObject(),
      totalPrice: updatedCart.totalPrice
    };
    res.status(200).json(updatedCartWithTotalPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cart by ID
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
};


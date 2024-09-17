const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Assuming you have a product model

const createOrderFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Ensure customerName and customerEmail are present
    if (!cart.customerName || !cart.customerEmail) {
      return res.status(400).json({ message: 'Cart must have customerName and customerEmail' });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      userId: cart.userId,
      customerName: cart.customerName,
      customerEmail: cart.customerEmail,
      products: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount: totalAmount,
      status: 'Pending'
    });

    const newOrder = await order.save();

    // Optionally, you can delete the cart after creating the order
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderFromCart,
  // other order controller functions
};
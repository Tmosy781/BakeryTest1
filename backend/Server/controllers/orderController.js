const Order = require('../models/orderModel');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'username')
        .populate('items.product', 'name price');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('user', 'username').populate('items.product', 'name price');
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id })
        .populate('items.product', 'name price');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  

  createOrder: async (req, res) => {
    const { items, totalAmount } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount
    });

    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  cancelOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (order.status !== 'Order Submitted') {
        return res.status(400).json({ message: 'Order cannot be canceled' });
      }

      if (order.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to cancel this order' });
      }

      order.status = 'Canceled';
      await order.save();

      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },


  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      await order.remove();
      res.json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = orderController;
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  customerName: {
    type: String,
    required: false,
    trim: true
  },
  customerEmail: {
    type: String,
    required: false,
    trim: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => total + (item.quantity * item.productId.price), 0);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
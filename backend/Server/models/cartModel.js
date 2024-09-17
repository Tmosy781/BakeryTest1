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

// Virtual field for total price
cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => {
    // Assuming you have a method to get the product price by its ID
    const productPrice = getProductPriceById(item.productId);
    return total + (productPrice * item.quantity);
  }, 0);
});

function getProductPriceById(productId) {
  // Implement this function to get the product price by its ID
  // This could be a database query or a lookup in a cached data structure
  // For example:
  // const product = await Product.findById(productId);
  // return product.price;
  return 10.99; // Placeholder value
}

module.exports = mongoose.model('Cart', cartSchema);
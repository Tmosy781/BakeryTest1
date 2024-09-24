const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Cakes', 'Cookies', 'Breads', 'Pastries', 'Other']
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
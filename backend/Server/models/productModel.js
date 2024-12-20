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
    enum: ['Cakes', 'Cookies', 'Breads', 'Pastries', 'Seasonal', 'Other']
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
  maxOrderQuantity: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
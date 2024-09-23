const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgName: { type: String, required: true }, // Reference to the image name
  imgUrl: { type: String, required: true }, // Reference to the image URL
  category: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
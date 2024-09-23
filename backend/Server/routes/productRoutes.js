const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Adjust the path as necessary
const Image = require('../models/imageModel'); // Adjust the path as necessary

// Endpoint to create a new product
router.post('/', async (req, res) => {
  const { name, description, price, imageName, category } = req.body;
  try {
    const image = await Image.findOne({ name: imageName });
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const newProduct = new Product({ name, description, price, imageName, imgUrl: image.imgUrl, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, imageName, category } = req.body;
    const image = await Image.findOne({ name: imageName });
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageName, imgUrl: image.imgUrl, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
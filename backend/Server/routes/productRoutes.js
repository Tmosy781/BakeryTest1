const express = require('express');
const Product = require('../models/productModel'); // Adjust the path as needed
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const { name, description, price, imageUrl, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, category },
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

// Update product image by ID
router.put('/:id/image', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product with image:', error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get the imageUrl of a product by ID
router.get('/:id/image', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id, 'imageUrl');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ imageUrl: product.imageUrl });
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
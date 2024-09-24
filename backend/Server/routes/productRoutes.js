const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { authenticateToken, isAdmin } = require('../middleware/index');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('image');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('image');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new product (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.imageId,
    ingredients: req.body.ingredients,
    allergens: req.body.allergens,
    inStock: req.body.inStock,
    quantity: req.body.quantity
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a product (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
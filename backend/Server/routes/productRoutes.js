const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { authenticateToken, isAdmin } = require('../middleware/index');

// GET all products (no changes needed)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('image');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product (no changes needed)
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
    maxOrderQuantity: req.body.maxOrderQuantity || 5 // Default to 5 if not provided
  });

  try {
    if (product.maxOrderQuantity < 1 || product.maxOrderQuantity > 5) {
      return res.status(400).json({ message: 'maxOrderQuantity must be between 1 and 5' });
    }
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

    // Update fields
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.image = req.body.imageId || product.image;
    product.ingredients = req.body.ingredients || product.ingredients;
    product.allergens = req.body.allergens || product.allergens;
    product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock;
    
    // Handle maxOrderQuantity
    if (req.body.maxOrderQuantity !== undefined) {
      if (req.body.maxOrderQuantity < 1 || req.body.maxOrderQuantity > 5) {
        return res.status(400).json({ message: 'maxOrderQuantity must be between 1 and 5' });
      }
      product.maxOrderQuantity = req.body.maxOrderQuantity;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product (admin only) (no changes needed)
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
const express = require('express');
const Recipe = require('../models/recipeModel'); // Adjust the path as needed

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { title, recipe, imageData, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
      title,
      recipe,
      imageData,
      ingredients,
      instructions
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error code
      res.status(400).json({ message: 'Recipe with this title already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel'); // Adjust the path as needed

const router = express.Router();

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    const { title, recipe, imageData, ingredients, instructions } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, recipe, imageData, ingredients, instructions },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
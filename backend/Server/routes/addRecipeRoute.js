const express = require('express');
const { z } = require('zod');
const Recipe = require('../models/recipeModel'); // Adjust the path as needed

const router = express.Router();

const createRecipeSchema = z.object({
  title: z.string().nonempty(),
  recipe: z.string().nonempty(),
  imageData: z.string().nonempty(),
  ingredients: z.array(z.string()).nonempty(),
  instructions: z.string().nonempty(),
});

router.post('/add', async (req, res) => {
  try {
    const { title, recipe, imageData, ingredients, instructions } = createRecipeSchema.parse(req.body);

    // Check if a recipe with the same title already exists
    const existingRecipe = await Recipe.findOne({ title });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe with this title already exists' });
    }

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
    console.error('Error adding recipe:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.issues[0].message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
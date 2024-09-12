const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  recipe: { 
    type: String,
    required: true,
    trim: true
  },
  imageData: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String], // Array of strings
    required: true
  },
  instructions: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Recipe', recipeSchema);
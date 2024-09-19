const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const mongoose = require('mongoose');
const Image = require('../models/imageModel'); // Adjust the path to your model as necessary

// Endpoint to retrieve all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to retrieve a single image by ID
router.get('/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found');
    }
    res.status(200).json(image);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to upload an image
router.post('/upload', async (req, res) => {
  try {
    const { name, imageData } = req.body;

    if (!name || !imageData) {
      return res.status(400).send('Missing image name or data');
    }

    // Save the image to the database
    const newImage = new Image({ name, imageData });
    await newImage.save();

    res.status(201).send('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
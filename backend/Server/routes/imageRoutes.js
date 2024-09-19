const express = require('express');
const router = express.Router();
const Image = require('../models/imageModel'); // Adjust the path as necessary

// Endpoint to retrieve all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get the Base64-encoded image data by ID
router.get('/:id/image', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ imageData: image.imageData });
  } catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get an image by name
router.get('/getByName/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const image = await Image.findOne({ name: name });
    console.log('Retrieved image:', image); // Log the retrieved image object
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Endpoint to upload an image
router.post('/upload', async (req, res) => {
  try {
    const { name, imageData } = req.body;

    if (!name || !imageData) {
      return res.status(400).json({ message: 'Missing image name or data' });
    }

    // Save the image to the database
    const newImage = new Image({ name, imageData });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
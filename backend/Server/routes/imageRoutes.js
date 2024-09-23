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

// Endpoint to get an image by imgName
router.get('/getByName/:imgName', async (req, res) => {
  const { imgName } = req.params;
  try {
    const image = await Image.findOne({ imgName: imgName });
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

// Endpoint to get an image by imgUrl
router.get('/getByUrl', async (req, res) => {
  const { imgUrl } = req.query;
  try {
    const image = await Image.findOne({ imgUrl: imgUrl });
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

module.exports = router;
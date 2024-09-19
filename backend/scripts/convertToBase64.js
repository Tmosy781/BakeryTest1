const fs = require('fs');
const path = require('path');

// Absolute path to the image file you want to convert
const imagePath = '/Users/thomasmosychukjr/BakeryPhotos/choco-cake.png';

// Path to the output file where the Base64 string will be saved
const outputPath = path.join(__dirname, 'base64Output.txt');

// Read the image file and convert it to Base64
fs.readFile(imagePath, (err, data) => {
  if (err) {
    console.error('Error reading the image file:', err);
    return;
  }
  const base64Image = data.toString('base64');
  fs.writeFile(outputPath, base64Image, (err) => {
    if (err) {
      console.error('Error writing the Base64 string to file:', err);
      return;
    }
    console.log('Base64 string has been written to', outputPath);
  });
});
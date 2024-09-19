import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImagesDisplay = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <div key={image._id}>
          <h3>{image.name}</h3>
          <img src={`data:image/jpeg;base64,${image.imageData}`} alt={image.name} />
        </div>
      ))}
    </div>
  );
};

export default ImagesDisplay;
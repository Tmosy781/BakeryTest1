import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_SERVER_URI || 'http://localhost:8081';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
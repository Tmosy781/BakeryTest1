import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_SERVER_URI || 'http://localhost:8081/api';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
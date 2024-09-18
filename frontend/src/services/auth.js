import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_SERVER_URI || 'http://localhost:8081';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
    const { token, cartId } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('cartId', cartId);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('cartId');
};
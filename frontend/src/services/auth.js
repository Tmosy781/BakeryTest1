// services/auth.js
import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8081/users/login', {
      username,
      password,
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken); // Store token correctly
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken'); // Ensure correct token removal on logout
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

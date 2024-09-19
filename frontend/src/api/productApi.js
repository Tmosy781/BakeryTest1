import axios from 'axios';

export const getProducts = () => {
  return axios.get('http://localhost:8081/products');
};

export const addProductToCart = (cartId, productId, quantity) => {
  return axios.post(`http://localhost:8081/carts/${cartId}/products`, {
    productId,
    quantity
  });
};
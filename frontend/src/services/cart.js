export const addProductToCart = async (cartId, productId, quantity) => {
  console.log('cartId:', cartId); // Debugging log
  console.log('productId:', productId); // Debugging log
  console.log('quantity:', quantity); // Debugging log

  const response = await fetch(`/api/carts/${cartId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Get the error text from the response
    console.error('Server response:', errorText); // Log the server response
    throw new Error('Failed to add product to cart');
  }

  return response.json();
};
export const addProductToCart = async (cartId, productId, quantity) => {
    const response = await fetch(`/api/cart/${cartId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
  
    return response.json();
  };
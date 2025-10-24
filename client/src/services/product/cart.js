import axios from '../api.js';

export const fetchUserCart = async () => {
  const response = await axios.get('/cart', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.cart;
};

export const addProductToCart = async (product) => {
  const response = await axios.post('/cart/add', { productId: product.id });
  return response.data.cartItem;
};

export const updateProductInCart = async ({ cartItemId, updatedQuantity }) => {
  const response = await axios.put('/cart/', {
    cartItemId,
    quantity: updatedQuantity,
  });
  return response.data.cartItem;
};

export const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete('/cart', { data: { cartItemId } });
  return response.data;
};

import api from './api.js';

export const createOrder = async ({ orderItems, shippingAddressId }) => {
  const response = await api.post('/order/create-order', {
    orderItems,
    shippingAddressId,
  });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post('/order/verify-order', paymentData);
  return response.data;
};

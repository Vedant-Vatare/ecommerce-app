import api from './api.js';

export const createOrder = async (orderData) => {
  const response = await api.post('/order/create-order', {
    orderItems: [...orderData],
    shippingAddressId: 'ae4327ef-aec9-4210-b0c0-00a8c1c309e5',
  });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post('/order/verify-order', paymentData);
  return response.data;
};

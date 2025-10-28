import axiosInstance from './api.js';

export const fetchUserAddresses = async () => {
  const response = await axiosInstance.get('/user/address/all', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.addresses;
};

export const addUserAddress = async (addressData) => {
  const response = await axiosInstance.post('/user/address/', addressData);
  return response.data.userAddress;
};

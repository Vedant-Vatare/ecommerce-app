import { createOrder } from '@/services/order';
import { useUserStore } from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';

export const usePlaceOrder = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: async (orderData) => createOrder(orderData),
    enabled: isLoggedIn,
    staleTime: Infinity,
  });
};

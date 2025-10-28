import { useUserStore } from '@/store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUserAddress, fetchUserAddresses } from '@/services/user';

export const useUserAddresses = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return useQuery({
    queryKey: ['user-addresses'],
    queryFn: fetchUserAddresses,
    refetchOnMount: false,
    enabled: isLoggedIn,
  });
};

export const useAddUserAddress = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-user-address'],
    mutationFn: (addressData) => addUserAddress(addressData),
    enabled: isLoggedIn,
    onSuccess: () => {
      queryClient.invalidateQueries(['user-addresses']);
    },
  });
};

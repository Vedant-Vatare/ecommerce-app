import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addProductToCart,
  fetchUserCart,
  removeProductFromCart,
  updateProductInCart,
} from '../services/product/cart';

export const useCartQuery = () => {
  return useQuery({
    queryKey: ['cart'],
    enabled: !!localStorage.getItem('token'),
    queryFn: fetchUserCart,
    staleTime: Infinity,
  });
};

export const useAddToCartQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: addProductToCart,

    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData(['cart']);

      queryClient.setQueryData(['cart'], (old = []) => {
        const optimisticItem = {
          product,
          quantity: 1,
        };
        return [...old, optimisticItem];
      });

      return { previousCart };
    },

    onSuccess: (data, product, context) => {
      queryClient.setQueryData(['cart'], (old = []) => {
        return old.map((item) =>
          item.product.id === product.id ? { ...item, ...data } : item,
        );
      });
    },

    onError: (error, product, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
  });
};

export const useUpdateCartItemQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['cart'],
    mutationFn: updateProductInCart,

    onMutate: async ({ cartItemId, updatedQuantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);

      queryClient.setQueryData(['cart'], (cartItems = []) => {
        return cartItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: updatedQuantity }
            : item,
        );
      });

      return { previousCart };
    },

    onError: (error, { cartItemId }, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
  });
};

export const useDeleteCartItemQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cart'],
    mutationFn: removeProductFromCart,
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      queryClient.setQueryData(['cart'], (old = []) =>
        old.filter((item) => item.id !== cartItemId),
      );

      return { previousCart };
    },

    onError: (error, cartItemId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
  });
};

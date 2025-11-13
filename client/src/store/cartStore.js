import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],

  cartItemsCount: undefined,

  fetchCart: (items) => {
    set(() => ({
      cartItems: items,
      cartItemsCount: items.length,
    }));
  },
  setCartItems: (items) => {
    set(() => ({
      cartItems: items,
      cartItemsCount: items.length,
    }));
  },
  updateCartItem: (productId, updatedItem) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId ? { ...item, ...updatedItem } : item,
      ),
    }));
  },
  updateItemQuantity: (cartId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === cartId ? { ...item, quantity } : item,
      ),
    }));
  },
  addToCart: (item) => {
    set((state) => ({
      cartItems: [...state.cartItems, item],
      cartItemsCount: state.cartItemsCount + 1,
    }));
  },
  removeFromCart: (productId) => {
    set((state) => {
      const updatedItems = state.cartItems.filter(
        (item) => item.product.id !== productId,
      );
      return {
        cartItems: updatedItems,
        cartItemsCount: updatedItems.length,
      };
    });
  },
}));

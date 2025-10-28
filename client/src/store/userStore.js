import { create } from 'zustand';

export const useUserStore = create((set) => ({
  isLoggedIn: localStorage.getItem('token') ? true : false,
}));

export const useLoginModal = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

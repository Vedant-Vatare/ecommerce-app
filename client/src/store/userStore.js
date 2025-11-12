import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useUserStore = create((set) => ({
  isLoggedIn: localStorage.getItem('token') ? true : false,
}));

export const useLoginModal = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export const useMailVerificationStore = create(
  persist(
    (set) => ({
      email: '',
      setEmail: (email) => set({ email }),
    }),
    {
      name: 'mail-verification-storage',
    },
  ),
);

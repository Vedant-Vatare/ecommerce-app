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
      verificationEmail: '',
      setVerificationEmail: (email) => set({ verificationEmail: email }),
    }),
    {
      name: 'mail-verification-storage',
    },
  ),
);

export const useAuthTimeoutStore = create(
  persist(
    (set) => ({
      timeout: null,
      setResendTimeout: () =>
        set({ timeout: new Date(Date.now() + 60 * 1000) }),
      clearResendTimeout: () => set({ timeout: null }),
    }),
    {
      name: 'verification-timeout',
    },
  ),
);

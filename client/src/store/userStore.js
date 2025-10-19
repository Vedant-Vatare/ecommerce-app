import { create } from 'zustand';

export const useUserStore = create((set) => ({
  isLoggedIn: localStorage.getItem('token') ? true : false,
}));

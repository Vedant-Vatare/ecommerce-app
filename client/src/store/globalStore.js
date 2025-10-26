import { create } from 'zustand';

export const breadcrumbStore = create((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
}));

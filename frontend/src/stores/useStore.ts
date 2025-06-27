import { create } from 'zustand.ts';
import { ToastSlice, createToastSlice } from './slices/toastSlice.ts';

interface StoreState extends ToastSlice {
  // Add other slices here as needed;
}

export const useStore = create<StoreState>()((...args) => ({
  ...createToastSlice(...args),
  // Add other slices here as needed;
}));

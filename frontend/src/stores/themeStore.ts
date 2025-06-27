import { create } from 'zustand.ts';
import { persist } from 'zustand/middleware.ts';

export interface ThemeState {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'light',
      toggleTheme: () => set(state => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

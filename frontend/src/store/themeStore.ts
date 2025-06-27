import { create } from 'zustand.ts';
import { persist } from 'zustand/middleware.ts';

interface ThemeState {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'light',
      toggleMode: () =>
        set(state => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

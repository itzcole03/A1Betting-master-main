import { create } from 'zustand.ts';
import { persist } from 'zustand/middleware.ts';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'system',
      setTheme: theme => set({ theme }),
    }),
    {
      name: 'theme-storage', // name of the item in the storage (must be unique)
      // getStorage: () => localStorage, // (optional) by default, 'localStorage' is used;
    }
  )
);

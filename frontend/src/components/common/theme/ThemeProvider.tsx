import React from 'react.ts';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react.ts';


type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system', 
  storageKey = 'vite-ui-theme', 
  ...props; 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme key={382340}>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  );

  useEffect(() => {

    root.classList.remove('light', 'dark');

    if (theme === 'system') {

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value} key={332622}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 
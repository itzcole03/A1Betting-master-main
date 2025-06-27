import React, { createContext, useContext, useState, useCallback  } from 'react.ts';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material.ts';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType key={510061}>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps key={251000}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }} key={676768}>
      <MuiThemeProvider theme={theme} key={729574}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

import React, { createContext, useContext  } from 'react.ts';
import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from '@mui/material.ts';
import { useTheme } from '@/hooks/useTheme.ts';

interface ThemeContextType {
  mode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType key={510061}>({
  mode: 'system',
  setThemeMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps key={251000}> = ({ children }) => {
  const { mode, theme, setThemeMode } = useTheme();
  const muiTheme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: theme,
        primary: {
          main: '#2196f3',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: theme === 'dark' ? '#121212' : '#fafafa',
          paper: theme === 'dark' ? '#1e1e1e' : '#fff',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
              borderRadius: 8,
            },
          },
        },
        MuiCardContent: {
          styleOverrides: {
            root: { padding: 24 },
          },
        },
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode }} key={158718}>
      <MuiThemeProvider theme={muiTheme} key={248678}>
        <CssBaseline / key={490279}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

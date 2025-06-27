import React from 'react.ts';
interface ThemeContextType {
    mode: 'light' | 'dark' | 'system';
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}
export declare const useThemeContext: () => ThemeContextType;
interface ThemeProviderProps {
    children: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};

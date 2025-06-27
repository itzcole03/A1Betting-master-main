import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const initialState = {
    theme: 'system',
    setTheme: () => null,
};

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme', ...props }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
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
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };
    return (_jsx(ThemeProviderContext.Provider, { ...props, value: value, children: children }));
}
export const useTheme = () => {

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

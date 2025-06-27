import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {

        if (savedTheme)
            return savedTheme === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    useEffect(() => {

        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return _jsx(ThemeContext.Provider, { value: { isDark, toggle }, children: children });
};
export const useTheme = () => {

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

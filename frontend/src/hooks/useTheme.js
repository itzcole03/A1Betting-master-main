import { useState, useEffect } from 'react';
export function useTheme() {

    const [mode, setMode] = useState(() => {
        if (typeof window !== 'undefined') {

            if (saved === 'light' || saved === 'dark' || saved === 'system')
                return saved;
            return 'system';
        }
        return 'system';
    });
    const [resolvedTheme, setResolvedTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            if (mode === 'system')
                return getSystemTheme();
            return mode;
        }
        return 'light';
    });
    useEffect(() => {
        if (mode === 'system') {

            updateSystemTheme();
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateSystemTheme);
            return () => {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateSystemTheme);
            };
        }
        else {
            setResolvedTheme(mode);
        }
    }, [mode]);
    useEffect(() => {

        root.classList.remove('light', 'dark');
        root.classList.add(resolvedTheme);
        localStorage.setItem('theme-mode', mode);
    }, [resolvedTheme, mode]);

    return {
        mode, // 'light' | 'dark' | 'system'
        theme: resolvedTheme, // 'light' | 'dark'
        setThemeMode,
    };
}

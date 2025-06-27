import useStore from '@/store/useStore.ts';
import { useEffect } from 'react.ts';



export const useDarkMode = () => {


  useEffect(() => {

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        toggleDarkMode();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [toggleDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode;
  };
}; 
import React, { useEffect  } from 'react.ts';
import { useStore } from '@/store/useStore.ts';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  useEffect(() => {

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);
  return <>{children}</>;
};

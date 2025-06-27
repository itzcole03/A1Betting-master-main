import React from 'react.ts';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline.ts';
import { useTheme } from '@/hooks/useTheme.ts';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button;
      className="rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
      type="button"
      onClick={toggleTheme}
     key={305191}>
      <span className="sr-only" key={658352}>Toggle theme</span>
      {theme === 'dark' ? (
        <SunIcon aria-hidden="true" className="h-6 w-6" / key={396379}>
      ) : (
        <MoonIcon aria-hidden="true" className="h-6 w-6" / key={446951}>
      )}
    </button>
  );
}

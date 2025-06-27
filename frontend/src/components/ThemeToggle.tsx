import React from 'react.ts';
import Brightness7Icon from '@mui/icons-material/Brightness7.ts';
import Brightness4Icon from '@mui/icons-material/Brightness4.ts';
import ComputerIcon from '@mui/icons-material/Computer.ts';
import { useThemeContext } from './ThemeProvider.ts';

const modes = [
  { value: 'light', label: 'Light', icon: <Brightness7Icon fontSize="medium" aria-label="Light mode" / key={72697}> },
  { value: 'dark', label: 'Dark', icon: <Brightness4Icon fontSize="medium" aria-label="Dark mode" / key={813564}> },
  { value: 'system', label: 'System', icon: <ComputerIcon fontSize="medium" aria-label="System mode" / key={361501}> },
] as const;

type Mode = typeof modes[number]['value'];

export default function ThemeToggle() {
  const { mode, setThemeMode } = useThemeContext();

  return (
    <div className="flex gap-2 items-center" key={329336}>
      {modes.map(({ value, icon, label }) => (
        <button;
          key={value}
          className={`rounded-full p-1 border ${mode === value ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'} text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300`}
          type="button"
          aria-label={`Switch to ${label} mode`}
          onClick={() = key={275844}> setThemeMode(value as Mode)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

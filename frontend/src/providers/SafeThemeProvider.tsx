import React, { ReactNode } from 'react';

// Simple stub theme types to maintain compatibility
export type ThemeVariant = 'cyber-light' | 'cyber-dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeConfig {
  variant: ThemeVariant;
  colors: ThemeColors;
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  effects: {
    glass: string;
    blur: string;
    shadow: string;
    glow: string;
  };
  animations: {
    duration: string;
    easing: string;
  };
}

interface ThemeContextType {
  theme: ThemeConfig;
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

// Default theme configuration
const DEFAULT_THEME: ThemeConfig = {
  variant: 'cyber-dark',
  colors: {
    primary: '#06ffa5',
    secondary: '#00ff88',
    accent: '#00d4ff',
    background:
      'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
    surface: 'rgba(255, 255, 255, 0.05)',
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      muted: '#94a3b8',
    },
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#06ffa5',
    warning: '#fbbf24',
    error: '#ff4757',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #06ffa5, #00ff88)',
    secondary: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
    background:
      'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
  },
  effects: {
    glass:
      'backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);',
    blur: 'backdrop-filter: blur(8px);',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 255, 165, 0.2)',
    glow: '0 0 20px rgba(6, 255, 165, 0.6), 0 0 40px rgba(6, 255, 165, 0.4)',
  },
  animations: {
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

interface SafeThemeProviderProps {
  children: ReactNode;
  defaultVariant?: ThemeVariant;
  enablePersistence?: boolean;
}

// Simple stub provider that doesn't cause errors
export const SafeThemeProvider: React.FC<SafeThemeProviderProps> = ({ children }) => {
  // Just render children without any theme context
  return <>{children}</>;
};

// Safe stub hook that returns default values
export const useTheme = (): ThemeContextType => {
  return {
    theme: DEFAULT_THEME,
    variant: 'cyber-dark',
    setVariant: () => {},
    isDark: true,
    toggleDarkMode: () => {},
  };
};

export default SafeThemeProvider;

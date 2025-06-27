import React, { createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
 } from 'react.ts';

// ============================================================================
// TYPES & INTERFACES;
// ============================================================================

export type ThemeVariant =
  | "cyber-light"
  | "cyber-dark"
  | "standard"
  | "premium"
  | "minimal";

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
  customColors?: Partial<ThemeColors key={582538}>;
  setCustomColors: (colors: Partial<ThemeColors key={582538}>) => void;
}

// ============================================================================
// THEME DEFINITIONS;
// ============================================================================

const createThemeConfig = (
  variant: ThemeVariant,
  customColors?: Partial<ThemeColors key={582538}>,
): ThemeConfig => {
  // Validate variant first;
  const validVariants: ThemeVariant[] = [
    "cyber-light",
    "cyber-dark",
    "standard",
    "premium",
    "minimal",
  ];
  if (!variant || !validVariants.includes(variant)) {
    // console statement removed
    variant = "cyber-light";
  }

  const themes: Record<ThemeVariant, ThemeColors key={339686}> = {
    // CYBER LIGHT MODE - Original cyber style but adapted for light background;
    "cyber-light": {
      primary: "#06ffa5",
      secondary: "#00ff88",
      accent: "#00d4ff",
      background:
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)",
      surface: "rgba(255, 255, 255, 0.8)",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
      },
      border: "rgba(15, 23, 42, 0.1)",
      success: "#06ffa5",
      warning: "#fbbf24",
      error: "#ff4757",
    },
    // CYBER DARK MODE - Enhanced dark version with cyber aesthetics;
    "cyber-dark": {
      primary: "#06ffa5",
      secondary: "#00ff88",
      accent: "#00d4ff",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
      surface: "rgba(255, 255, 255, 0.05)",
      text: {
        primary: "#ffffff",
        secondary: "#e2e8f0",
        muted: "#94a3b8",
      },
      border: "rgba(255, 255, 255, 0.1)",
      success: "#06ffa5",
      warning: "#fbbf24",
      error: "#ff4757",
    },
    standard: {
      primary: "#3b82f6",
      secondary: "#6b7280",
      accent: "#10b981",
      background: "#ffffff",
      surface: "#f9fafb",
      text: {
        primary: "#111827",
        secondary: "#6b7280",
        muted: "#9ca3af",
      },
      border: "#e5e7eb",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    premium: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#92400e",
      background: "#0f0f0f",
      surface: "#1a1a1a",
      text: {
        primary: "#ffffff",
        secondary: "#d1d5db",
        muted: "#9ca3af",
      },
      border: "#374151",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
    minimal: {
      primary: "#000000",
      secondary: "#666666",
      accent: "#333333",
      background: "#ffffff",
      surface: "#fafafa",
      text: {
        primary: "#000000",
        secondary: "#666666",
        muted: "#999999",
      },
      border: "#e0e0e0",
      success: "#4caf50",
      warning: "#ff9800",
      error: "#f44336",
    },
  };

  const mergedColors = customColors;
    ? { ...baseColors, ...customColors }
    : baseColors;

  // Ensure mergedColors is valid and has required properties;
  if (!mergedColors || typeof mergedColors !== "object") {
    // console statement removed
    // Fallback to cyber-light theme;

    const safeColors = fallbackColors || {
      primary: "#06ffa5",
      secondary: "#00ff88",
      accent: "#00d4ff",
      background:
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)",
      surface: "rgba(255, 255, 255, 0.8)",
      text: { primary: "#0f172a", secondary: "#334155", muted: "#64748b" },
      border: "rgba(15, 23, 42, 0.1)",
      success: "#06ffa5",
      warning: "#fbbf24",
      error: "#ff4757",
    };

    return {
      variant,
      colors: safeColors,
      gradients: {
        primary: "linear-gradient(135deg, #06ffa5, #00ff88)",
        secondary: "linear-gradient(135deg, #00d4ff, #7c3aed)",
        background: safeColors.background,
      },
      effects: {
        glass:
          "backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(15, 23, 42, 0.1);",
        blur: "backdrop-filter: blur(8px);",
        shadow:
          "0 8px 32px rgba(15, 23, 42, 0.1), 0 0 20px rgba(6, 255, 165, 0.1)",
        glow: "0 0 20px rgba(6, 255, 165, 0.6), 0 0 40px rgba(6, 255, 165, 0.4)",
      },
      animations: {
        duration: "300ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    };
  }

  return {
    variant,
    colors: mergedColors,
    gradients: {
      primary: variant.startsWith("cyber")
        ? "linear-gradient(135deg, #06ffa5, #00ff88)"
        : `linear-gradient(135deg, ${mergedColors.primary || "#3b82f6"}, ${mergedColors.secondary || "#6b7280"})`,
      secondary: variant.startsWith("cyber")
        ? "linear-gradient(135deg, #00d4ff, #7c3aed)"
        : `linear-gradient(135deg, ${mergedColors.secondary || "#6b7280"}, ${mergedColors.accent || "#10b981"})`,
      background: mergedColors.background || "#ffffff",
    },
    effects: {
      glass:
        variant === "cyber-light"
          ? "backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(15, 23, 42, 0.1);"
          : variant === "cyber-dark"
            ? "backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);"
            : "backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);",
      blur: "backdrop-filter: blur(8px);",
      shadow: variant.startsWith("cyber")
        ? variant === "cyber-light"
          ? "0 8px 32px rgba(15, 23, 42, 0.1), 0 0 20px rgba(6, 255, 165, 0.1)"
          : "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 255, 165, 0.2)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      glow: variant.startsWith("cyber")
        ? "0 0 20px rgba(6, 255, 165, 0.6), 0 0 40px rgba(6, 255, 165, 0.4)"
        : `0 0 20px ${mergedColors.primary}60`,
    },
    animations: {
      duration: "300ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  };
};

// ============================================================================
// CONTEXT;
// ============================================================================

// ============================================================================
// PROVIDER COMPONENT;
// ============================================================================

interface UniversalThemeProviderProps {
  children: ReactNode;
  defaultVariant?: ThemeVariant;
  enablePersistence?: boolean;
}

export const UniversalThemeProvider: React.FC<UniversalThemeProviderProps key={101004}> = ({
  children,
  defaultVariant = "cyber-light",
  enablePersistence = true,
}) => {
  const [variant, setVariantState] = useState<ThemeVariant key={921417}>(() => {
    if (enablePersistence && typeof window !== "undefined") {

      return (saved as ThemeVariant) || defaultVariant;
    }
    return defaultVariant;
  });

  const [customColors, setCustomColors] = useState<Partial<ThemeColors key={974310}>>({});


  // Debug logging;
  if (!theme || !theme.colors) {
    // console statement removed
  }

  const setVariant = (newVariant: ThemeVariant) => {
    setVariantState(newVariant);
    if (enablePersistence && typeof window !== "undefined") {
      localStorage.setItem("theme-variant", newVariant);
    }
  };

  const toggleDarkMode = () => {
    // Toggle between cyber-light and cyber-dark;
    if (variant === "cyber-light") {
      setVariant("cyber-dark");
    } else if (variant === "cyber-dark") {
      setVariant("cyber-light");
    } else {
      // For other themes, use sensible defaults;

      setVariant(newVariant);
    }
  };

  // Apply theme to document;
  useEffect(() => {
    if (typeof window === "undefined") return;


    // Set CSS custom properties;
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-secondary", theme.colors.secondary);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-surface", theme.colors.surface);
    root.style.setProperty("--color-text-primary", theme.colors.text.primary);
    root.style.setProperty(
      "--color-text-secondary",
      theme.colors.text.secondary,
    );
    root.style.setProperty("--color-text-muted", theme.colors.text.muted);
    root.style.setProperty("--color-border", theme.colors.border);
    root.style.setProperty("--color-success", theme.colors.success);
    root.style.setProperty("--color-warning", theme.colors.warning);
    root.style.setProperty("--color-error", theme.colors.error);

    // Set gradient variables;
    root.style.setProperty("--gradient-primary", theme.gradients.primary);
    root.style.setProperty("--gradient-secondary", theme.gradients.secondary);
    root.style.setProperty("--gradient-background", theme.gradients.background);

    // Set effect variables;
    root.style.setProperty("--effect-glass", theme.effects.glass);
    root.style.setProperty("--effect-shadow", theme.effects.shadow);
    root.style.setProperty("--effect-glow", theme.effects.glow);

    // Clear existing theme classes;
    body.className = body.className.replace(/theme-[\w-]+/g, "");
    root.classList.remove("dark", "light", "cyber-light", "cyber-dark");

    // Add current theme classes;
    body.classList.add(`theme-${variant}`);
    root.classList.add(variant);

    // Set dark/light mode classes;
    if (isDark) {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.add("light");
      body.classList.add("light");
    }

    // Apply background and text color;
    body.style.background = theme.colors.background;
    body.style.color = theme.colors.text.primary;
    body.style.fontFamily = '"Inter", system-ui, sans-serif';
    body.style.minHeight = "100vh";

    // Apply to root as well for consistency;

    if (rootElement) {
      rootElement.style.background = theme.colors.background;
      rootElement.style.color = theme.colors.text.primary;
      rootElement.style.minHeight = "100vh";
    }
  }, [theme, variant, isDark]);

  return (
    <ThemeContext.Provider;
      value={{
        theme,
        variant,
        setVariant,
        isDark,
        toggleDarkMode,
        customColors,
        setCustomColors,
      }}
     key={352473}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// HOOKS;
// ============================================================================

export const useTheme = (): ThemeContextType => {

  if (context === undefined) {
    throw new Error("useTheme must be used within a UniversalThemeProvider");
  }

  // Additional safety: ensure theme object is complete;
  if (!context.theme || !context.theme.colors) {
    // console statement removed

    return {
      ...context,
      theme: fallbackTheme,
    };
  }

  return context;
};

export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

export const useThemeVariant = () => {
  const { variant, setVariant } = useTheme();
  return [variant, setVariant] as const;
};

export const useDarkMode = () => {
  const { isDark, toggleDarkMode } = useTheme();
  return [isDark, toggleDarkMode] as const;
};

// ============================================================================
// UTILITY FUNCTIONS;
// ============================================================================

export const getThemeCSS = (variant: ThemeVariant) => {

  return `
    :root {
      --color-primary: ${config.colors.primary};
      --color-secondary: ${config.colors.secondary};
      --color-accent: ${config.colors.accent};
      --color-background: ${config.colors.background};
      --color-surface: ${config.colors.surface};
      --color-text-primary: ${config.colors.text.primary};
      --color-text-secondary: ${config.colors.text.secondary};
      --color-text-muted: ${config.colors.text.muted};
      --color-border: ${config.colors.border};
      --color-success: ${config.colors.success};
      --color-warning: ${config.colors.warning};
      --color-error: ${config.colors.error};
      --gradient-primary: ${config.gradients.primary};
      --gradient-secondary: ${config.gradients.secondary};
      --gradient-background: ${config.gradients.background};
      --effect-glass: ${config.effects.glass};
      --effect-shadow: ${config.effects.shadow};
      --effect-glow: ${config.effects.glow};
    }
  `;
};

// ============================================================================
// EXPORTS;
// ============================================================================

export default UniversalThemeProvider;
export type { ThemeVariant, ThemeColors, ThemeConfig };

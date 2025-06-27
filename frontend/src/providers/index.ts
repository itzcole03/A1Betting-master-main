// ============================================================================
// UNIVERSAL PROVIDER SYSTEM EXPORTS;
// ============================================================================

export {
  UniversalThemeProvider,
  useTheme,
  useThemeColors,
  useThemeVariant,
  useDarkMode,
  getThemeCSS,
} from './UniversalThemeProvider.ts';

export type {
  ThemeVariant,
  ThemeColors,
  ThemeConfig,
} from './UniversalThemeProvider.ts';

// Default export;
export { default } from './UniversalThemeProvider.ts';

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS (Deprecated - Use Universal equivalents)
// ============================================================================

/**
 * @deprecated Use UniversalThemeProvider instead;
 */
export { UniversalThemeProvider as ThemeProvider } from './UniversalThemeProvider.ts';

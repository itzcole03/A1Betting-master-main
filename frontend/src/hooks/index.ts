// ============================================================================
// UNIVERSAL HOOKS SYSTEM EXPORTS;
// ============================================================================

export {
  // Data hooks;
  usePredictions,
  useEngineMetrics,
  useBettingOpportunities,
  useUserProfile,

  // UI hooks;
  useUniversalTheme,
  useUniversalForm,
  useModal,
  useToast,

  // Utility hooks;
  useDebounce,
  useLocalStorage,
  useWindowSize,
  useMediaQuery,
  useClickOutside,
  useWebSocket,

  // Performance hooks;
  useAnimation,
  usePerformanceMonitor,
} from './UniversalHooks.ts';

// Default export;
export { default } from './UniversalHooks.ts';

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS (Deprecated - Use Universal equivalents)
// ============================================================================

// Theme hooks;
export { useUniversalTheme as useTheme } from './UniversalHooks.ts';
export { useUniversalTheme as useDarkMode } from './UniversalHooks.ts';

// Form hooks;
export { useUniversalForm as useForm } from './UniversalHooks.ts';

// Analytics hooks (redirect to consolidated system)
export { usePredictions as useAnalytics } from './UniversalHooks.ts';
export { useBettingOpportunities as useBettingCore } from './UniversalHooks.ts';

// Prediction hooks;
export { usePredictions as usePredictionService } from './UniversalHooks.ts';
export { usePredictions as useRealtimePredictions } from './UniversalHooks.ts';

// Ultimate Settings Hook;
export { default as useUltimateSettings } from './useUltimateSettings.ts';

// ============================================================================
// DEPRECATED HOOK NOTICES;
// ============================================================================

/**
 * @deprecated Use useUniversalTheme from UniversalHooks instead;
 */
export const useThemeStore = () => {
  // console statement removed
  return {};
};

/**
 * @deprecated Use consolidated hooks from UniversalHooks instead;
 */
export const useMLAnalytics = () => {
  // console statement removed
  return {};
};

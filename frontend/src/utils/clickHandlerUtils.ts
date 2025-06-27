/**
 * Utility functions to ensure onClick handlers are safe and prevent errors;
 */

/**
 * Ensures an onClick handler is a function, returning a no-op if not;
 * @param onClick - The onClick handler to validate;
 * @returns A safe onClick function;
 */
export const safeOnClick = (onClick?: (() => void) | null): (() => void) => {
  if (typeof onClick === "function") {
    return onClick;
  }
  // Return a no-op function if onClick is not a function;
  return () => {
    if (process.env.NODE_ENV === "development") {
      // console statement removed
    }
  };
};

/**
 * Creates a safe onClick handler that wraps the original in a try-catch;
 * @param onClick - The onClick handler to wrap;
 * @returns A safe onClick function that won't crash the app;
 */
export const wrappedOnClick = (onClick?: (() => void) | null): (() => void) => {
  return () => {
    try {
      if (typeof onClick === "function") {
        onClick();
      }
    } catch (error) {
      // console statement removed
      // Optionally show user-friendly error message;
      if (typeof window !== "undefined" && "toast" in window) {
        // If toast is available, show error;
        // console statement removed
      }
    }
  };
};

/**
 * Validates that an onClick prop is a function before passing it to a component;
 * @param onClick - The onClick handler to validate;
 * @returns The onClick function if valid, undefined otherwise;
 */
export const validateOnClick = (
  onClick?: (() => void) | null,
): (() => void) | undefined => {
  if (typeof onClick === "function") {
    return onClick;
  }

  if (onClick !== undefined && onClick !== null) {
    // console statement removed
  }

  return undefined;
};

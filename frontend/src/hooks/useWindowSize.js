import { useState, useEffect, useCallback } from 'react';
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
    };
}
export function useWindowSize({ debounceMs = 250, mobileBreakpoint = 640, tabletBreakpoint = 1024 } = {}) {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false;
    });
    const handleResize = useCallback(() => {


        setWindowSize({
            width,
            height,
            isMobile: width < mobileBreakpoint,
            isTablet: width >= mobileBreakpoint && width < tabletBreakpoint,
            isDesktop: width >= tabletBreakpoint;
        });
    }, [mobileBreakpoint, tabletBreakpoint]);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        // Initial call;
        handleResize();
        // Set up debounced event listener;

        window.addEventListener('resize', debouncedHandleResize);
        // Cleanup;
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [debounceMs, handleResize]);
    return windowSize;
}
// Breakpoint constants;
export const BREAKPOINTS = {
    MOBILE: 640,
    TABLET: 1024,
    DESKTOP: 1280,
    WIDE: 1536;
};
// Media query hooks;
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;

        setMatches(mediaQuery.matches);
        const handler = (event) => {
            setMatches(event.matches);
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);
    return matches;
}
// Predefined media query hooks;
export function useIsMobile() {
    return useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`);
}
export function useIsTablet() {
    return useMediaQuery(`(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.TABLET - 1}px)`);
}
export function useIsDesktop() {
    return useMediaQuery(`(min-width: ${BREAKPOINTS.TABLET}px)`);
}
// Example usage:
/*
function ResponsiveComponent() {
  const { width, height, isMobile, isTablet, isDesktop } = useWindowSize();
  // or use individual hooks;



  return (
    <div>
      <p>Window size: {width} x {height}</p>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
*/ 

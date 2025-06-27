// Performance monitoring utility for Jest/RTL;
export async function measurePerformance(fn, label) {

    await fn();


    // Log or report;
    // console statement removed}ms`);
    if (duration > 2000) {
        throw new Error(`[PERF] ${label} exceeded 2s: ${duration.toFixed(2)}ms`);
    }
}

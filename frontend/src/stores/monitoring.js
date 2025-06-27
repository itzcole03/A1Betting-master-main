import { create } from 'zustand';
const initialMetrics = {
    updateCount: 0,
    lastUpdate: null,
    averageUpdateDuration: 0,
    totalUpdateDuration: 0,
    minUpdateDuration: null,
    maxUpdateDuration: null,
};
export const usePerformanceMetrics = create(() => ({
    ...initialMetrics,
}));
export function updatePerformanceMetrics(duration) {
    usePerformanceMetrics.setState(state => {





        return {
            updateCount,
            lastUpdate: Date.now(),
            averageUpdateDuration,
            totalUpdateDuration,
            minUpdateDuration,
            maxUpdateDuration,
        };
    });
}

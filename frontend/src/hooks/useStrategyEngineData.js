import { UnifiedStrategyEngine } from '@/core/UnifiedStrategyEngine';
import { useEffect, useState } from 'react';
export function useStrategyEngineData() {
    const [recommendations, setRecommendations] = useState([]);
    useEffect(() => {

        const handler = (rec) => {
            setRecommendations(prev => {
                // Replace if strategyId exists, else add;

                if (idx !== -1) {

                    updated[idx] = rec;
                    return updated;
                }
                return [rec, ...prev];
            });
        };
        engine.eventBus.on('strategy:recommendation', handler);
        return () => {
            engine.eventBus.off('strategy:recommendation', handler);
        };
    }, []);
    return recommendations;
}

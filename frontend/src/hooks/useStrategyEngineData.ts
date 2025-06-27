import { StrategyRecommendation, UnifiedStrategyEngine } from '@/core/UnifiedStrategyEngine.ts';
import { useEffect, useState } from 'react.ts';

export function useStrategyEngineData() {
    const [recommendations, setRecommendations] = useState<StrategyRecommendation[]>([]);

    useEffect(() => {

        const handler = (rec: StrategyRecommendation) => {
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

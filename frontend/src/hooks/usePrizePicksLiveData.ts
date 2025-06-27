import { webSocketManager } from '@/services/unified/WebSocketManager.ts';
import { useEffect, useState } from 'react.ts';

export interface PrizePicksEdgeLiveData {
    id: string;
    playerName: string;
    statType: string;
    line: number;
    overOdds: number;
    underOdds: number;
    confidence: number;
    expectedValue: number;
    kellyFraction: number;
    modelBreakdown?: Record<string, number>;
    riskReasoning?: string[];
    traceId?: string;
}

export function usePrizePicksLiveData() {
    const [livePrizePicksData, setLivePrizePicksData] = useState<PrizePicksEdgeLiveData[]>([]);

    useEffect(() => {
        const handler = (prop: PrizePicksEdgeLiveData) => {
            setLivePrizePicksData(prev => {
                // Replace if id exists, else add;

                if (idx !== -1) {

                    updated[idx] = prop;
                    return updated;
                }
                return [prop, ...prev];
            });
        };
        webSocketManager.on('prizepicks:prop', handler);
        return () => {
            webSocketManager.off('prizepicks:prop', handler);
        };
    }, []);

    return livePrizePicksData;
}

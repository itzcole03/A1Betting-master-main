import { useStore } from '@/stores/useStore.ts';
import type { Opportunity } from '@/types/core.ts';
import type { PlayerProp, Sport, PropType } from '@/types/core.ts';
import { dailyFantasyService } from '@/services/dailyFantasy.ts';
import { oddsjamService } from '@/services/oddsjam.ts';
import { useState, useEffect, useCallback } from 'react.ts';
import { webSocketManager } from '@/services/unified/WebSocketManager.ts';



interface UsePropsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  sport?: Sport;
  propType?: PropType;
}

export const useProps = ({
  autoRefresh = true,
  refreshInterval = 30000,
  sport,
  propType;
}: UsePropsOptions = {}) => {
  const [props, setProps] = useState<PlayerProp[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { addToast } = useStore();

  const fetchProps = useCallback(async () => {
    try {
      const [propsData, arbitrageData] = await Promise.all([
        dailyFantasyService.getPlayers({ sport, position: propType }),
        oddsjamService.getArbitrageOpportunities(sport || 'NBA')
      ]);

      setProps(propsData as PlayerProp[]);
      setOpportunities(
        (arbitrageData as any[]).map((item) => ({
          ...item,
          propId: item.id,
          analysis: {
            historicalTrends: [],
            marketSignals: [],
            riskFactors: []
          }
        }))
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch props'));
      addToast({
        id: 'props-error',
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch props data'
      });
    } finally {
      setIsLoading(false);
    }
  }, [sport, propType, addToast]);

  useEffect(() => {
    fetchProps();

    if (autoRefresh) {

      return () => clearInterval(interval);
    }
  }, [fetchProps, autoRefresh, refreshInterval]);

  useEffect(() => {
    function handlePropUpdate(data: PlayerProp) {
      setProps(prev => {

        if (index === -1) return [...prev, data];

        updated[index] = data;
        return updated;
      });
    }

    function handleArbitrageAlert(data: Opportunity & { potentialProfit?: number; player?: { name: string } }) {
      setOpportunities(prev => [...prev, data]);
      addToast({
        id: data.id,
        type: 'info',
        title: 'New Arbitrage Opportunity',
        message: `${data.potentialProfit ?? ''}% profit available on ${data.player?.name ?? ''}`
      });
    }

    webSocketManager.on('prop_update', handlePropUpdate);
    webSocketManager.on('arbitrage_alert', handleArbitrageAlert);

    return () => {
      webSocketManager.off('prop_update', handlePropUpdate);
      webSocketManager.off('arbitrage_alert', handleArbitrageAlert);
    };
  }, [addToast]);

  const refreshProps = () => {
    setIsLoading(true);
    fetchProps();
  };

  return {
    props,
    opportunities,
    isLoading,
    error,
    refreshProps;
  };
}; 
import useStore from '../store/useStore.ts';
import { oddsjamService } from '../services/oddsjam.ts';
import { dailyFantasyService } from '../services/dailyFantasy.ts';
import { useState, useEffect, useCallback } from 'react';
import { webSocketManager } from '../services/unified/WebSocketManager.ts';
export const useBettingData = ({ sport, propType, autoRefresh = true, refreshInterval = 30000, minOddsChange = 0.1, onNewOpportunity } = {}) => {
    const [props, setProps] = useState([]);
    const [oddsUpdates, setOddsUpdates] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fallback for addToast if not present, memoized for hook safety;

    // Fetch initial data;
    const fetchData = useCallback(async () => {
        try {
            // Fetch player props using unified dailyFantasyService;

            setProps(propsData);
            // Fetch arbitrage opportunities using unified oddsjamService;

            setOpportunities(opportunitiesData);
            setError(null);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch data'));
            addToast({
                id: 'data-error',
                type: 'error',
                title: 'Error',
                message: 'Failed to fetch betting data'
            });
        }
        finally {
            setIsLoading(false);
        }
    }, [sport, propType, addToast]);
    // Handle WebSocket messages;
    const handleWebSocketMessage = useCallback((message) => {
        if (typeof message !== 'object' || message === null)
            return;

        switch (msg.type) {
            case 'prop_update': {

                setProps(prev => {

                    if (index === -1)
                        return [...prev, data];

                    updated[index] = data;
                    return updated;
                });
                break;
            }
            case 'odds_update': {

                if (sport && update.sport !== sport)
                    return;
                if (propType && update.propType !== propType)
                    return;

                if (oddsChange < minOddsChange)
                    return;
                setOddsUpdates(prev => [update, ...prev].slice(0, 50));
                if (oddsChange >= 0.5) {
                    addToast({
                        id: `odds-update-${update.id}`,
                        type: 'info',
                        title: 'Odds Update',
                        message: `Odds updated for ${update.propName} from ${update.oldOdds} to ${update.newOdds}`
                    });
                }
                break;
            }
            case 'arbitrage_alert': {

                setOpportunities(prev => [opportunity, ...prev].slice(0, 50));
                if (onNewOpportunity)
                    onNewOpportunity(opportunity);
                addToast({
                    id: `arbitrage-${opportunity.id}`,
                    type: 'success',
                    title: 'Arbitrage Opportunity',
                    message: `New arbitrage opportunity: ${opportunity.description}`
                });
                break;
            }
            default:
                // console statement removed
        }
    }, [sport, propType, minOddsChange, addToast, onNewOpportunity]);
    // Set up the event listener;
    useEffect(() => {
        webSocketManager.on('message', handleWebSocketMessage);
        return () => {
            try {
                webSocketManager.off('message', handleWebSocketMessage);
            }
            catch (error) {
                // console statement removed
            }
        };
    }, [handleWebSocketMessage]);
    // Setup auto-refresh;
    useEffect(() => {
        fetchData();
        if (autoRefresh) {

            return () => clearInterval(interval);
        }
    }, [fetchData, autoRefresh, refreshInterval]);
    const refresh = () => {
        setIsLoading(true);
        fetchData();
    };
    return {
        props,
        oddsUpdates,
        opportunities,
        isLoading,
        isConnected,
        error,
        refresh;
    };
};

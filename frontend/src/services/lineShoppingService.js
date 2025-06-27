import { EventEmitter } from 'events';
export class LineShoppingService extends EventEmitter {
    constructor() {
        super();
        this.sportsbooks = new Map();
        this.oddsCache = new Map();
        this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes;
    }
    /**
     * Register a sportsbook for line shopping;
     */
    registerSportsbook(sportsbook) {
        this.sportsbooks.set(sportsbook.id, sportsbook);
    }
    /**
     * Update odds for a specific sportsbook;
     */
    updateOdds(bookmakerId, odds) {
        if (!this.sportsbooks.has(bookmakerId)) {
            throw new Error(`Sportsbook ${bookmakerId} not registered`);
        }
        odds.forEach(odd => {

            if (!this.oddsCache.has(eventKey)) {
                this.oddsCache.set(eventKey, new Map());
            }

            if (!marketOdds.has(odd.selection)) {
                marketOdds.set(odd.selection, []);
            }


            if (existingIndex >= 0) {
                selectionOdds[existingIndex] = odd;
            }
            else {
                selectionOdds.push(odd);
            }
        });
        this.emit('oddsUpdated', { bookmakerId, odds });
    }
    /**
     * Find the best odds for a specific selection;
     */
    findBestOdds(eventId, market, selection) {


        if (!marketOdds) {
            return null;
        }

        if (!selectionOdds || selectionOdds.length === 0) {
            return null;
        }
        // Filter out expired odds;


        if (validOdds.length === 0) {
            return null;
        }
        // Find best odds;

        // Calculate price improvement;


        // Calculate confidence based on:
        // 1. Number of books offering the selection;
        // 2. Time since last odds update;
        // 3. Odds consistency across books;

        return {
            eventId,
            market,
            selection,
            bestOdds: {
                bookmaker: bestOdd.bookmaker,
                odds: bestOdd.odds,
                timestamp: bestOdd.timestamp,
            },
            allOdds: validOdds.map(odd => ({
                bookmaker: odd.bookmaker,
                odds: odd.odds,
                timestamp: odd.timestamp,
            })),
            priceImprovement,
            confidence,
        };
    }
    /**
     * Calculate confidence score for odds;
     */
    calculateConfidence(odds) {

        // Time factor (0-1)
        const timeFactor = odds.reduce((sum, odd) => {

            return sum + Math.max(0, 1 - age / this.CACHE_TTL);
        }, 0) / odds.length;
        // Consistency factor (0-1)

        const variance = odds.reduce((sum, odd) => {

            return sum + diff * diff;
        }, 0) / odds.length;

        // Coverage factor (0-1)

        // Weighted combination;
        return timeFactor * 0.4 + consistencyFactor * 0.3 + coverageFactor * 0.3;
    }
    /**
     * Get all available odds for a specific event and market;
     */
    getMarketOdds(eventId, market) {

        return this.oddsCache.get(eventKey) || null;
    }
    /**
     * Clear expired odds from cache;
     */
    clearExpiredOdds() {

        this.oddsCache.forEach((marketOdds, eventKey) => {
            marketOdds.forEach((selectionOdds, selection) => {

                if (validOdds.length === 0) {
                    marketOdds.delete(selection);
                }
                else {
                    marketOdds.set(selection, validOdds);
                }
            });
            if (marketOdds.size === 0) {
                this.oddsCache.delete(eventKey);
            }
        });
    }
}

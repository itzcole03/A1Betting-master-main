// bankrollService.ts;
// Singleton service for bankroll tracking, stats, and settings;
class BankrollService {
    constructor() {
        this.transactions = [];
        this.settings = {
            maxBetPercentage: 0.05,
            stopLossPercentage: 0.2,
            takeProfitPercentage: 0.5,
            kellyFraction: 0.5,
        };
        this.stats = {
            currentBalance: 1000,
            startingBalance: 1000,
            totalWins: 0,
            totalLosses: 0,
            winRate: 0,
            averageBetSize: 0,
            largestWin: 0,
            largestLoss: 0,
            netProfit: 0,
            roi: 0,
        };
    }
    static getInstance() {
        if (!BankrollService._instance) {
            BankrollService._instance = new BankrollService();
        }
        return BankrollService._instance;
    }
    addTransaction(tx) {
        this.transactions.push(tx);
        this.recalculateStats();
    }
    getTransactions() {
        return [...this.transactions];
    }
    getSettings() {
        return { ...this.settings };
    }
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }
    getStats() {
        return { ...this.stats };
    }
    recalculateStats() {












        this.stats = {
            ...this.stats,
            currentBalance,
            totalWins: wins.length,
            totalLosses: losses.length,
            winRate,
            averageBetSize,
            largestWin,
            largestLoss,
            netProfit,
            roi,
        };
    }
    reset() {
        this.transactions = [];
        this.stats = { ...this.stats, currentBalance: this.stats.startingBalance, netProfit: 0 };
    }
}
export const bankrollService = BankrollService.getInstance();

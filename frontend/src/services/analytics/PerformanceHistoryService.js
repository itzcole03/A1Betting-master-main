export class PerformanceHistoryService {
    constructor() {
        this.userHistories = new Map();
        this.modelHistories = new Map();
    }
    static getInstance() {
        if (!PerformanceHistoryService.instance) {
            PerformanceHistoryService.instance = new PerformanceHistoryService();
        }
        return PerformanceHistoryService.instance;
    }
    getUserHistory(userId) {
        return this.userHistories.get(userId);
    }
    getModelHistory(model, market) {
        return this.modelHistories.get(`${model}:${market}`);
    }
    addUserHistoryEntry(userId, entry) {
        if (!this.userHistories.has(userId)) {
            this.userHistories.set(userId, { userId, entries: [] });
        }
        this.userHistories.get(userId).entries.push(entry);
    }
    addModelHistoryEntry(model, market, entry) {

        if (!this.modelHistories.has(key)) {
            this.modelHistories.set(key, { model, market, entries: [] });
        }
        this.modelHistories.get(key).entries.push(entry);
    }
    getUserStats(userId) {

        if (!history)
            return null;



        return { wins, losses, roi };
    }
}

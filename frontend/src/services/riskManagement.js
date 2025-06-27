var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
const RiskManagementService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    const _classExtraInitializers = [];
    let _classThis;
    const _classSuper = EventEmitter;
    var RiskManagementService = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.bankroll = {
                initial: 1000,
                current: 1000,
                totalBets: 0,
                winningBets: 0,
                totalProfit: 0,
                roi: 0,
                averageBetSize: 0,
                largestBet: 0,
                largestWin: 0,
                largestLoss: 0,
                currentStreak: 0,
                currentStreakType: 'win',
                winStreak: 0,
                lossStreak: 0,
            };
            this.bets = [];
            this.MAX_BANKROLL_PERCENTAGE = 0.05; // 5% max bet size;
            this.MIN_BANKROLL_PERCENTAGE = 0.01; // 1% min bet size;
            this.KELLY_FRACTION = 0.5; // Half Kelly for conservative betting;
        }
        static getInstance() {
            if (!RiskManagementService.instance) {
                RiskManagementService.instance = new RiskManagementService();
            }
            return RiskManagementService.instance;
        }
        async initialize() {
            // Initialize risk management service;
        }
        async assessRisk(params) {
            // Implement risk assessment logic;
            return {
                riskLevel: 'low',
                expectedValue: 0.1,
                confidence: 0.8,
                maxStake: 100,
                recommendedStake: 50,
            };
        }
        getBankroll() {
            return { ...this.bankroll };
        }
        getBets() {
            return [...this.bets];
        }
        calculateRiskMetrics(prediction) {








            return {
                kellyCriterion,
                recommendedStake,
                maxStake,
                riskLevel,
                edge,
                expectedValue,
                variance,
                sharpeRatio,
            };
        }
        placeBet(params) {
            if (params.amount > this.bankroll.current) {
                throw new Error('Insufficient bankroll');
            }
            const bet = {
                id: `bet_${Date.now()}`,
                recommendationId: params.recommendationId,
                amount: params.amount,
                type: params.type,
                odds: params.odds,
                timestamp: Date.now(),
                status: 'pending',
            };
            this.bets.push(bet);
            this.bankroll.current -= params.amount;
            this.bankroll.totalBets++;
            this.bankroll.averageBetSize =
                (this.bankroll.averageBetSize * (this.bankroll.totalBets - 1) + params.amount) /
                    this.bankroll.totalBets;
            this.bankroll.largestBet = Math.max(this.bankroll.largestBet, params.amount);
            this.updateBankrollMetrics();
        }
        resolveBet(betId, won) {

            if (!bet || bet.status !== 'pending') {
                throw new Error('Invalid bet');
            }
            bet.status = won ? 'won' : 'lost';
            if (won) {

                bet.payout = payout;
                this.bankroll.current += payout;
                this.bankroll.winningBets++;
                this.bankroll.totalProfit += payout - bet.amount;
                this.bankroll.largestWin = Math.max(this.bankroll.largestWin, payout - bet.amount);
                if (this.bankroll.currentStreakType === 'win') {
                    this.bankroll.currentStreak++;
                }
                else {
                    this.bankroll.currentStreak = 1;
                    this.bankroll.currentStreakType = 'win';
                }
                this.bankroll.winStreak = Math.max(this.bankroll.winStreak, this.bankroll.currentStreak);
            }
            else {
                this.bankroll.largestLoss = Math.max(this.bankroll.largestLoss, bet.amount);
                if (this.bankroll.currentStreakType === 'loss') {
                    this.bankroll.currentStreak++;
                }
                else {
                    this.bankroll.currentStreak = 1;
                    this.bankroll.currentStreakType = 'loss';
                }
                this.bankroll.lossStreak = Math.max(this.bankroll.lossStreak, this.bankroll.currentStreak);
            }
            this.updateBankrollMetrics();
        }
        calculateKellyCriterion(prediction) {




            return (winProbability * winAmount - lossProbability * lossAmount) / winAmount;
        }
        calculateRecommendedStake(kellyCriterion, prediction) {


            return Math.min(kellyStake, maxStake);
        }
        calculateMaxStake(prediction) {
            return this.bankroll.current * this.MAX_BANKROLL_PERCENTAGE;
        }
        determineRiskLevel(prediction, stake) {



            if (stakePercentage <= this.MIN_BANKROLL_PERCENTAGE && confidence >= 80 && edge >= 0.1) {
                return 'low';
            }
            else if (stakePercentage <= this.MAX_BANKROLL_PERCENTAGE &&
                confidence >= 60 &&
                edge >= 0.05) {
                return 'medium';
            }
            else {
                return 'high';
            }
        }
        calculateVariance(prediction) {





            const variance = winProbability * Math.pow(winAmount - expectedValue, 2) +
                lossProbability * Math.pow(-lossAmount - expectedValue, 2);
            return variance;
        }
        calculateSharpeRatio(expectedValue, variance) {
            return expectedValue / Math.sqrt(variance);
        }
        updateBankrollMetrics() {
            this.bankroll.roi = (this.bankroll.totalProfit / this.bankroll.initial) * 100;
        }
        resetBankroll(initialAmount) {
            this.bankroll = {
                initial: initialAmount,
                current: initialAmount,
                totalBets: 0,
                winningBets: 0,
                totalProfit: 0,
                roi: 0,
                averageBetSize: 0,
                largestBet: 0,
                largestWin: 0,
                largestLoss: 0,
                currentStreak: 0,
                currentStreakType: 'win',
                winStreak: 0,
                lossStreak: 0,
            };
            this.bets = [];
        }
    };
    __setFunctionName(_classThis, "RiskManagementService");
    (() => {

        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RiskManagementService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RiskManagementService = _classThis;
})();
export { RiskManagementService };
export const riskManagementService = RiskManagementService.getInstance();

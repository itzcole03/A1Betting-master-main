/**
 * Unified Backend API Service;
 * Handles all communication with the A1Betting backend;
 */

import axios from 'axios.ts';

// Types;
export interface BettingOpportunity {
  id: string;
  sport: string;
  event: string;
  market: string;
  odds: number;
  probability: number;
  expected_value: number;
  kelly_fraction: number;
  confidence: number;
  risk_level: string;
  recommendation: string;
}

export interface ArbitrageOpportunity {
  id: string;
  sport: string;
  event: string;
  bookmaker_a: string;
  bookmaker_b: string;
  odds_a: number;
  odds_b: number;
  profit_margin: number;
  required_stake: number;
}

export interface Transaction {
  id: string;
  type: "bet" | "win" | "loss" | "deposit" | "withdrawal";
  amount: number;
  description: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
}

export interface ActiveBet {
  id: string;
  event: string;
  market: string;
  selection: string;
  stake: number;
  potential_payout: number;
  status: "active" | "settled" | "voided";
  placed_at: string;
}

export interface RiskProfile {
  name: string;
  description: string;
  max_bet_percentage: number;
  max_exposure: number;
  risk_tolerance: number;
}

class BackendApi {
  private api: any;
  private baseURL: string;

  constructor() {
    // Determine backend URL;
    this.baseURL = this.determineBackendURL();

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor for production error handling;
    this.api.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        // console statement removed
        throw error;
      },
    );
  }

  private determineBackendURL(): string {
    // Environment variables for backend URL;
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;
    }
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }

    // Local development;
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return "http://localhost:8000";
    }

    // Production - use current origin with /api prefix;
    return window.location.origin + "/api";
  }

  // Health check;
  public async getHealth() {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      throw new Error("Backend service is unavailable. Please try again later.");
    }
  }

  // Value bets;
  public async getValueBets() {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.value_bets || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Betting opportunities;
  public async getBettingOpportunities(): Promise<BettingOpportunity[]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.opportunities || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Arbitrage opportunities;
  public async getArbitrageOpportunities(): Promise<ArbitrageOpportunity[]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.opportunities || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Predictions;
  public async getPredictions(params?: any) {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.predictions || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Transactions;
  public async getTransactions(): Promise<Transaction[]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.transactions || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Active bets;
  public async getActiveBets(): Promise<ActiveBet[]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.active_bets || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }

  // Advanced analytics;
  public async getAdvancedAnalytics() {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      return {
        summary: {
          accuracy: 0,
          totalBets: 0,
          winningBets: 0,
        },
        recentPerformance: [],
        topPerformingSports: [],
        monthlyTrends: [],
      };
    }
  }

  // Generic HTTP methods for extensibility;
  public async get(endpoint: string, params?: any) {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      throw error;
    }
  }

  public async post(endpoint: string, data?: any) {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      throw error;
    }
  }

  public async put(endpoint: string, data?: any) {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      throw error;
    }
  }

  public async delete(endpoint: string) {
    try {

      return response.data;
    } catch (error: any) {
      // console statement removed
      throw error;
    }
  }

  // Risk profiles;
  public async getRiskProfiles(): Promise<RiskProfile[]> {
    try {

      return Array.isArray(response.data)
        ? response.data;
        : response.data?.profiles || [];
    } catch (error: any) {
      // console statement removed
      return [];
    }
  }
}

// Create singleton instance;
export const backendApi = new BackendApi();
export default backendApi;

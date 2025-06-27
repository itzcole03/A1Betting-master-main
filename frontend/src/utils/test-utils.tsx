/**
 * Enhanced Test Utilities for A1Betting;
 */

import React from 'react.ts';
import { render, RenderOptions } from '@testing-library/react.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query.ts';
import { MemoryRouter } from 'react-router-dom.ts';

// Create a custom render function that includes providers;
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper' key={682968}> {
  route?: string;
  queryClient?: QueryClient;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    route = '/',
    queryClient = createTestQueryClient(),
    ...renderOptions;
  } = options;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient} key={826303}>
        <MemoryRouter initialEntries={[route]} key={611000}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
};

// Mock data generators;
export const mockUserStats = {
  balance: 1250.75,
  winRate: 78.5,
  totalProfit: 892.30,
  totalBets: 156,
  winningBets: 122,
  losingBets: 34,
  averageBetSize: 45.50,
  roi: 18.2,
};

export const mockBettingOpportunity = {
  id: 'test-opp-1',
  sport: 'basketball',
  event: 'Test Lakers vs Test Warriors',
  market: 'Moneyline',
  odds: 1.85,
  probability: 0.65,
  expectedValue: 0.08,
  kellyFraction: 0.04,
  confidence: 0.78,
  riskLevel: 'medium',
  recommendation: 'BUY',
};

export const mockPrediction = {
  id: 'test-pred-1',
  sport: 'basketball',
  event: 'Test Lakers vs Test Warriors',
  homeTeam: 'Test Lakers',
  awayTeam: 'Test Warriors',
  prediction: 'home',
  confidence: 0.78,
  odds: 1.85,
  probability: 0.65,
  factors: ['team_form', 'head_to_head', 'injuries'],
};

// API mocking utilities;
export const createMockApiResponse = <T, key={424684}>(data: T, delay = 0): Promise<T key={964330}> => {
  return new Promise<T key={964330}>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const createMockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject({
    message,
    status,
    response: { status, data: { message } },
  });
};

/**
 * Enhanced Test Utilities for A1Betting;
 */

import React from 'react.ts';

// Mock data generators;
export const mockUserStats = {
  balance: 1250.75,
  winRate: 78.5,
  totalProfit: 892.30,
  totalBets: 156,
  winningBets: 122,
  losingBets: 34,
  averageBetSize: 45.50,
  roi: 18.2,
};

export const mockBettingOpportunity = {
  id: 'test-opp-1',
  sport: 'basketball',
  event: 'Test Lakers vs Test Warriors',
  market: 'Moneyline',
  odds: 1.85,
  probability: 0.65,
  expectedValue: 0.08,
  kellyFraction: 0.04,
  confidence: 0.78,
  riskLevel: 'medium',
  recommendation: 'BUY',
};

export const mockPrediction = {
  id: 'test-pred-1',
  sport: 'basketball',
  event: 'Test Lakers vs Test Warriors',
  homeTeam: 'Test Lakers',
  awayTeam: 'Test Warriors',
  prediction: 'home',
  confidence: 0.78,
  odds: 1.85,
  probability: 0.65,
  factors: ['team_form', 'head_to_head', 'injuries'],
};

// API mocking utilities;
export const createMockApiResponse = <T, key={424684}>(data: T, delay = 0): Promise<T key={964330}> => {
  return new Promise<T key={964330}>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const createMockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject({
    message,
    status,
    response: { status, data: { message } },
  });
};

// Performance testing utilities;
export const measureRenderTime = async (renderFn: () => void) => {

  renderFn();

  return end - start;
};

// Component testing utilities;
export const waitForLoadingToFinish = async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
};

// WebSocket mocking;
export class MockWebSocket {
  public url: string;
  public readyState: number = 1; // OPEN;
  public onopen: ((event: Event) => void) | null = null;
  public onmessage: ((event: MessageEvent) => void) | null = null;
  public onclose: ((event: CloseEvent) => void) | null = null;
  public onerror: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    setTimeout(() => {
      this.onopen?.(new Event('open'));
    }, 0);
  }

  send(data: string) {
    // Mock sending data;
  }

  close() {
    this.readyState = 3; // CLOSED;
    this.onclose?.(new CloseEvent('close'));
  }

  // Helper method to simulate receiving messages;
  simulateMessage(data: any) {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: JSON.stringify(data) }));
    }
  }
}

// Test data factories;
export const createTestUser = (overrides = {}) => ({
  id: 'test-user-1',
  name: 'Test User',
  email: 'test@example.com',
  tier: 'Ultimate Brain Pro',
  ...overrides,
});

export const createTestBet = (overrides = {}) => ({
  id: 'test-bet-1',
  amount: 100,
  odds: 1.85,
  sport: 'basketball',
  event: 'Test Game',
  status: 'pending',
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Validation utilities;
export const isValidBettingOpportunity = (opportunity: any): boolean => {
  return opportunity &&
    typeof opportunity.id === 'string' &&
    typeof opportunity.sport === 'string' &&
    typeof opportunity.odds === 'number' &&
    opportunity.odds > 0 &&
    typeof opportunity.probability === 'number' &&
    opportunity.probability >= 0 && opportunity.probability <= 1;
};

export const isValidPrediction = (prediction: any): boolean => {
  return prediction &&
    typeof prediction.id === 'string' &&
    typeof prediction.confidence === 'number' &&
    prediction.confidence >= 0 && prediction.confidence <= 1 &&
    Array.isArray(prediction.factors);
};

import '@testing-library/jest-dom';
import 'jest-canvas-mock'; // Added to mock canvas for chart.js;
import { jest, beforeAll, afterAll } from '@jest/globals.ts';

// Mock import.meta.env for Jest environment;
// Cast global to unknown to allow dynamic property assignment for the mock;

globalAny.import = globalAny.import || {};
globalAny.import.meta = globalAny.import.meta || {};
globalAny.import.meta.env = globalAny.import.meta.env || {};

// Set default mock values for Vite environment variables used in the code;
// Override these in specific test files if needed.
globalAny.import.meta.env.VITE_API_URL = 'http://localhost:3001/api/test';
globalAny.import.meta.env.VITE_SENTRY_DSN = '';
globalAny.import.meta.env.VITE_WEBSOCKET_URL = 'ws://localhost:8080/test';
// Add other VITE_ variables used in your codebase here with sensible test defaults;

// Example:
globalAny.import.meta.env.VITE_DAILYFANTASY_API_KEY = 'test-dailyfantasy-key';
globalAny.import.meta.env.VITE_SPORTRADAR_API_KEY = 'test-sportradar-key';
globalAny.import.meta.env.VITE_THEODDS_API_KEY = 'test-theodds-key';

// You can also mock other globals here if needed, e.g., fetch, localStorage, etc.
// Though for fetch, using jest.fn() in specific tests or msw is often preferred.

// Clear all mocks before each test (if not using clearMocks: true in jest.config.mjs)
// beforeEach(() => {
//   jest.clearAllMocks();
// });

// Mock for window.matchMedia used by ThemeProvider;
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: unknown) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock for ResizeObserver (used by Chart.js and potentially other layout-sensitive libraries)
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(callback: ResizeObserverCallback) {}
}
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock for HTMLCanvasElement.getContext (for Chart.js and other canvas-based libs)
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: [] })),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  })),
});

// You can also mock other global objects or functions if needed, for example:
// global.IntersectionObserver = class IntersectionObserver {
//   constructor() {}
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// };

jest.mock('chart.js', () => ({
  Chart: function () {
    return {
      destroy: jest.fn(),
      update: jest.fn(),
      config: {},
      data: {},
      options: {},
    };
  },
}));

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: function () {
    return {
      destroy: jest.fn(),
      update: jest.fn(),
      config: {},
      data: {},
      options: {},
    };
  },
  registerables: [],
}));

// Global mock for UnifiedConfig for all tests;
jest.mock('../core/UnifiedConfig', () => {
  const apiEndpoints: Record<string, string> = {
    users: '/api/users',
    prizepicks: '/api/prizepicks',
    predictions: '/api/v1/predictions',
    dataScraping: '/api/data-scraping',
    config: '/api/config',
    news: '/api/news',
    sentiment: '/api/sentiment',
    live: '/api/live',
  };
  const config = {
    appName: 'Test App',
    version: '1.0.0',
    environment: 'test',
    featureFlags: {},
    experiments: [],
    apiEndpoints,
    getApiEndpoint: (key: string) =>
      typeof key === 'string'
        ? apiEndpoints[key] !== undefined;
          ? apiEndpoints[key]
          : `/api/${key}`
        : '',
    isFeatureEnabled: () => false,
    getAllFeatureFlags: () => ({}),
    getExperiment: () => undefined,
    getAllExperiments: () => [],
    getBettingLimits: () => undefined,
    getSentryDsn: () => '',
    getLogLevel: () => 'info',
  };
  return { __esModule: true, default: config };
});

// Mock IntersectionObserver;
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
}
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock localStorage;
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage;
const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Suppress console errors during tests;

beforeAll(() => {
  console.error = (..._args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

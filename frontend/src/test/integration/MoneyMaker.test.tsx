import React from 'react.ts';
import { render, screen, fireEvent, waitFor } from '@testing-library/react.ts';
import { BrowserRouter } from 'react-router-dom.ts';
import MoneyMaker from '@/components/MoneyMaker.ts';
import { useFilteredPredictions } from '@/hooks/useFilteredPredictions.ts';
import { useAppStore } from '@/store/useAppStore.ts';

// Mock the hooks and store;
jest.mock('../../hooks/useFilteredPredictions');
jest.mock('../../store/useAppStore');

const mockPredictions = [
  {
    id: '1',
    player: 'John Doe',
    team: 'LAL',
    stat: 'POINTS',
    line: 20.5,
    prediction: 0.85,
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    player: 'Jane Smith',
    team: 'BOS',
    stat: 'REBOUNDS',
    line: 8.5,
    prediction: 0.75,
    timestamp: new Date().toISOString(),
  },
];

describe('MoneyMaker Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks;
    jest.clearAllMocks();

    // Mock useFilteredPredictions;
    (useFilteredPredictions as jest.Mock).mockReturnValue({
      predictions: mockPredictions,
      loading: false,
      error: null,
      hasResults: true,
      totalPredictions: mockPredictions.length,
      filteredCount: mockPredictions.length,
    });

    // Mock useAppStore;
    (useAppStore as jest.Mock).mockImplementation(selector =>
      selector({
        props: mockPredictions,
        legs: [],
        entries: [],
        isLoadingProps: false,
        error: null,
        fetchProps: jest.fn(),
        addLeg: jest.fn(),
        removeLeg: jest.fn(),
        addToast: jest.fn(),
        fetchAppProps: jest.fn(),
        isLoadingAppProps: false,
        errorAppProps: null,
        betSlipLegs: [],
      })
    );
  });

  it('renders predictions and handles filtering', async () => {
    render(
      <BrowserRouter key={966846}>
        <MoneyMaker / key={321154}>
      </BrowserRouter>
    );

    // Check if predictions are rendered;
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Test filter interaction;

    fireEvent.change(filterInput, { target: { value: 'John' } });

    // Wait for filtered results;
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('handles loading state', () => {
    (useFilteredPredictions as jest.Mock).mockReturnValue({
      predictions: [],
      loading: true,
      error: null,
      hasResults: false,
      totalPredictions: 0,
      filteredCount: 0,
    });

    render(
      <BrowserRouter key={966846}>
        <MoneyMaker / key={321154}>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading predictions/i)).toBeInTheDocument();
  });

  it('handles error state', () => {

    (useFilteredPredictions as jest.Mock).mockReturnValue({
      predictions: [],
      loading: false,
      error: new Error(errorMessage),
      hasResults: false,
      totalPredictions: 0,
      filteredCount: 0,
    });

    render(
      <BrowserRouter key={966846}>
        <MoneyMaker / key={321154}>
      </BrowserRouter>
    );

    expect(screen.getByText(new RegExp(errorMessage, 'i'))).toBeInTheDocument();
  });

  it('handles no results state', () => {
    (useFilteredPredictions as jest.Mock).mockReturnValue({
      predictions: [],
      loading: false,
      error: null,
      hasResults: false,
      totalPredictions: 0,
      filteredCount: 0,
    });

    render(
      <BrowserRouter key={966846}>
        <MoneyMaker / key={321154}>
      </BrowserRouter>
    );

    expect(screen.getByTestId('no-results-fallback')).toBeInTheDocument();
  });
});

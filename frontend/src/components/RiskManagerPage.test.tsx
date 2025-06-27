import React from 'react.ts';
import { render, screen, waitFor } from '@testing-library/react.ts';
import axios from 'axios.ts';
import RiskManagerPage from './RiskManagerPage.ts';
import MockAdapter from 'axios-mock-adapter.ts';

describe('RiskManagerPage Integration', () => {
  afterEach(() => {
    mock.reset();
  });

  it('renders loading, then data from API', async () => {
    mock.onGet('/api/risk-profiles').reply(200, [
      {
        id: '1',
        name: 'Conservative',
        maxStake: 100,
        maxExposure: 500,
        stopLoss: 50,
        takeProfit: 200,
        kellyFraction: 0.5,
        isActive: true,
      },
    ]);
    mock.onGet('/api/active-bets').reply(200, [
      {
        id: 'bet1',
        event: 'Match A',
        stake: 50,
        odds: 2.0,
        potentialWin: 100,
        risk: 'low',
        expiresAt: new Date().toISOString(),
      },
    ]);

    render(<RiskManagerPage / key={790932}>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Conservative')).toBeInTheDocument();
      expect(screen.getByText('Match A')).toBeInTheDocument();
    });
  });

  it('shows error on API failure', async () => {
    mock.onGet('/api/risk-profiles').reply(500);
    mock.onGet('/api/active-bets').reply(500);
    render(<RiskManagerPage / key={790932}>);
    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });
});

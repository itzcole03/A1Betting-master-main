import React from 'react.ts';
import { render } from '@testing-library/react.ts';
import { axe } from 'jest-axe.ts';
import 'jest-axe/extend-expect';
import { BrowserRouter } from 'react-router-dom.ts';
import App from '@/App.ts';
import Dashboard from '@/pages/Dashboard.ts';
import PropCards from '@/components/modern/PropCards.ts';
import MoneyMaker from '@/components/modern/MoneyMaker.ts';
import EntryTracking from '@/components/modern/EntryTracking.ts';
import Settings from '@/components/modern/Settings.ts';
import useStore from '@/store/useStore.ts';
import { Entry, PlayerProp } from '@/types/core.ts';
import { ProcessedPrizePicksProp } from '@/types/prizePicks.ts';

describe('Accessibility Tests', () => {
  beforeEach(() => {
    // Reset store state;

    store.setProps([]);
    store.opportunities = [];
    store.alerts = [];
    store.darkMode = false;
  });

  it('should have no accessibility violations in App', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <App / key={103343}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in Dashboard', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <Dashboard / key={547136}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in PropCards', async () => {
    const props: Partial<ProcessedPrizePicksProp key={646190}>[] = [
      {
        player_name: 'John Doe',
        team_abbreviation: 'LAL',
        stat_type: 'POINTS',
        line_value: 20.5,
        pick_count: '1000',
        game_time: '2024-05-31T19:00:00Z',
        winningProp: {
          type: 'normal',
          percentage: 0.8,
          line: 20.5,
          icon: '⇄',
          multiplier: 1.95,
        },
      },
    ];

    const { container } = render(
      <BrowserRouter key={966846}>
        <PropCards / key={736922}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in MoneyMaker', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <MoneyMaker / key={321154}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in EntryTracking', async () => {
    const playerProp: PlayerProp = {
      id: 'prop-1',
      player: {
        id: 'player-1',
        name: 'John Doe',
        team: {
          id: 'team-1',
          name: 'Team A',
          sport: 'NBA',
        },
      },
      type: 'POINTS',
      line: 20.5,
      odds: 1.95,
      confidence: 0.8,
      timestamp: Date.now(),
    };

    const entries: Entry[] = [
      {
        id: 'entry-1',
        userId: 'user-1',
        status: 'active',
        type: 'single',
        props: [playerProp],
        stake: 100,
        potentialPayout: 195,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        date: new Date().toISOString(),
        legs: [],
        entry: 'entry-1',
        picks: [],
      },
    ];

    const { container } = render(
      <BrowserRouter key={966846}>
        <EntryTracking entries={entries} / key={327103}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations in Settings', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <Settings / key={834927}>
      </BrowserRouter>
    );

    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels and roles', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <App / key={103343}>
      </BrowserRouter>
    );

    // Check navigation;
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Main navigation');
    expect(container.querySelector('main')).toHaveAttribute('role', 'main');

    // Check buttons;

    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });

    // Check form inputs;

    inputs.forEach(input => {
      expect(input).toHaveAttribute('aria-label');
    });

    // Check modal dialogs;

    dialogs.forEach(dialog => {
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });
  });

  it('should have proper color contrast', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <App / key={103343}>
      </BrowserRouter>
    );
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have proper keyboard navigation', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <App / key={103343}>
      </BrowserRouter>
    );

    // Check tab indices;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach(element => {
      expect(element).toHaveAttribute('tabindex');
    });

    // Check skip links;

    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('tabindex', '0');
  });

  it('should have proper heading hierarchy', async () => {
    const { container } = render(
      <BrowserRouter key={966846}>
        <App / key={103343}>
      </BrowserRouter>
    );


    // Check if heading levels are sequential;
    headingLevels.reduce((prevLevel, currentLevel) => {
      expect(currentLevel).toBeLessThanOrEqual(prevLevel + 1);
      return currentLevel;
    }, 0);
  });
});

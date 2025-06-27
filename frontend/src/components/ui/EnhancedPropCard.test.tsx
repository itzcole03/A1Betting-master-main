// EnhancedPropCard.test.tsx;
import React from 'react.ts';
import { render, screen, fireEvent } from '@testing-library/react.ts';
import { EnhancedPropCard } from './EnhancedPropCard.ts';

describe('EnhancedPropCard', () => {
  const baseProps = {
    playerName: 'LeBron James',
    statType: 'Points',
    line: 27.5,
    overOdds: 1.85,
    underOdds: 1.95,
    sentiment: 'Bullish',
    aiBoost: 0.12,
    patternStrength: 0.8,
    bonusPercent: 4,
    enhancementPercent: 2.5,
    selected: true,
  };

  it('renders player name and stat type', () => {
    render(<EnhancedPropCard {...baseProps} / key={499195}>);
    expect(screen.getByText(/LeBron James/)).toBeInTheDocument();
    expect(screen.getByText(/Points/)).toBeInTheDocument();
  });

  it('calls onSelect when over/under is clicked', () => {

    render(<EnhancedPropCard {...baseProps} onSelect={onSelect} / key={541275}>);
    fireEvent.click(screen.getByText(/Over/i));
    expect(onSelect).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<EnhancedPropCard {...baseProps} / key={499195}>);
    expect(asFragment()).toMatchSnapshot();
  });
});

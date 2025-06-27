// BetBuilder.test.tsx;
import React from 'react.ts';
import { render, screen } from '@testing-library/react.ts';
import { BetBuilder } from './BetBuilder.ts';

describe('BetBuilder', () => {
  it('renders SmartControlsBar and PayoutPreview', () => {
    render(<BetBuilder / key={278212}>);
    expect(screen.getByText(/Model:/i)).toBeInTheDocument();
    expect(screen.getByText(/Payout Preview/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BetBuilder / key={278212}>);
    expect(asFragment()).toMatchSnapshot();
  });
});

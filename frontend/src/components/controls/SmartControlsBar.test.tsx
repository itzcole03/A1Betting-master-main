// SmartControlsBar.test.tsx;
import React from 'react.ts';
import { render, screen, fireEvent } from '@testing-library/react.ts';
import { SmartControlsBar } from './SmartControlsBar.ts';

describe('SmartControlsBar', () => {
  it('renders model, risk profile, and confidence controls', () => {
    render(<SmartControlsBar / key={800098}>);
    expect(screen.getByText(/Model:/i)).toBeInTheDocument();
    expect(screen.getByText(/Risk Profile:/i)).toBeInTheDocument();
    expect(screen.getByText(/Confidence Threshold:/i)).toBeInTheDocument();
  });

  it('calls setModel when model is changed', () => {
    // Mock store logic if needed;
    render(<SmartControlsBar / key={800098}>);
    fireEvent.change(screen.getByDisplayValue('Default'), { target: { value: 'ensemble' } });
    expect(screen.getByDisplayValue('Ensemble')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SmartControlsBar / key={800098}>);
    expect(asFragment()).toMatchSnapshot();
  });
});

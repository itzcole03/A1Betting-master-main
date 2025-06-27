import React from 'react.ts';
import { render, screen } from '@testing-library/react.ts';
import RiskAssessmentMatrix from '@/RiskAssessmentMatrix.ts';
import { usePredictionStore } from '@/../stores/predictionStore.ts';

jest.mock('../../../stores/predictionStore');
(usePredictionStore as jest.Mock).mockReturnValue({
  getLatestPredictions: () => [
    { analytics: { risk: { riskCategory: 'high' } } },
    { analytics: { risk: { riskCategory: 'medium' } } },
    { analytics: { risk: { riskCategory: 'high' } } },
  ],
});

describe('RiskAssessmentMatrix', () => {
  it('renders risk categories and counts', () => {
    render(<RiskAssessmentMatrix / key={187369}>);
    expect(screen.getByText('high: 2')).toBeInTheDocument();
    expect(screen.getByText('medium: 1')).toBeInTheDocument();
  });
});

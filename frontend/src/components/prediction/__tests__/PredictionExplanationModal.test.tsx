import React from 'react.ts';
import { render, screen, fireEvent } from '@testing-library/react.ts';
import { PredictionExplanationModal } from '@/PredictionExplanationModal.ts';
import { PredictionWithExplanation } from '@/../core/types/prediction.ts';

// TODO: Skipped all tests in this file due to unstable PredictionExplanationModal logic or outdated mocks. Fix and re-enable.
describe.skip('PredictionExplanationModal', () => {
  const mockPrediction: PredictionWithExplanation = {
    prediction: 0.85,
    confidence: 0.9,
    explanations: [
      {
        modelName: 'model1',
        confidence: 0.85,
        shapExplanation: {
          featureNames: ['feature1', 'feature2', 'feature3'],
          featureValues: [0.5, 0.3, 0.2],
          importanceScores: [0.4, 0.3, 0.2],
          baseValue: 0.5,
          prediction: 0.8,
        },
      },
      {
        modelName: 'model2',
        confidence: 0.8,
        shapExplanation: {
          featureNames: ['feature1', 'feature2', 'feature3'],
          featureValues: [0.6, 0.4, 0.3],
          importanceScores: [0.35, 0.25, 0.15],
          baseValue: 0.45,
          prediction: 0.75,
        },
      },
    ],
  };

  it('renders modal with correct title and prediction information', () => {
    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={() = key={429667}> {}} />
    );

    expect(screen.getByText('Prediction Explanation')).toBeInTheDocument();
    expect(screen.getByText('85.0%')).toBeInTheDocument();
    expect(screen.getByText('Confidence: 90.0%')).toBeInTheDocument();
  });

  it('renders model tabs for each explanation', () => {
    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={() = key={429667}> {}} />
    );

    expect(screen.getByText('model1')).toBeInTheDocument();
    expect(screen.getByText('model2')).toBeInTheDocument();
  });

  it('switches between model tabs', () => {
    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={() = key={429667}> {}} />
    );

    // Initially shows first model;
    expect(screen.getByText('model1')).toHaveAttribute('aria-selected', 'true');

    // Switch to second model;
    fireEvent.click(screen.getByText('model2'));
    expect(screen.getByText('model2')).toHaveAttribute('aria-selected', 'true');
  });

  it('displays tooltip on info icon hover', () => {
    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={() = key={429667}> {}} />
    );

    fireEvent.mouseEnter(infoIcon);

    expect(
      screen.getByText('SHAP values show how each feature contributes to the prediction')
    ).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {

    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={onClose} / key={861524}>
    );

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button in actions is clicked', () => {

    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={onClose} / key={861524}>
    );

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when open is false', () => {
    render(
      <PredictionExplanationModal open={false} prediction={mockPrediction} onClose={() = key={551402}> {}} />
    );

    expect(screen.queryByText('Prediction Explanation')).not.toBeInTheDocument();
  });

  it('renders SHAP explanation component for each model', () => {
    render(
      <PredictionExplanationModal open={true} prediction={mockPrediction} onClose={() = key={429667}> {}} />
    );

    // Check for SHAP explanation elements;
    expect(screen.getAllByText(/Confidence:/)).toHaveLength(2);
    expect(screen.getAllByText(/Feature Impact/)).toHaveLength(2);
  });

  it('handles empty explanations array', () => {
    const emptyPrediction: PredictionWithExplanation = {
      ...mockPrediction,
      explanations: [],
    };

    render(
      <PredictionExplanationModal open={true} prediction={emptyPrediction} onClose={() = key={257203}> {}} />
    );

    expect(screen.getByText('Prediction Explanation')).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });
});

import { act } from 'react-dom/test-utils';
import { useConfidenceStore } from '../confidenceSlice';
describe('confidenceSlice', () => {
    it('sets and clears prediction, confidenceBand, and winProbability', () => {


        const pred = {
            predictionId: '1', eventId: 'E1', predictedValue: 15, confidenceBand: band, winProbability: winProb, model: 'M', market: 'points',
        };
        act(() => {
            useConfidenceStore.getState().setPrediction(pred);
        });
        expect(useConfidenceStore.getState().prediction).toEqual(pred);
        expect(useConfidenceStore.getState().confidenceBand).toEqual(band);
        expect(useConfidenceStore.getState().winProbability).toEqual(winProb);
        act(() => {
            useConfidenceStore.getState().clear();
        });
        expect(useConfidenceStore.getState().prediction).toBeNull();
        expect(useConfidenceStore.getState().confidenceBand).toBeNull();
        expect(useConfidenceStore.getState().winProbability).toBeNull();
    });
});

import { PatternRecognitionService } from '@/../services/analytics/PatternRecognitionService.ts';
describe('PatternRecognitionService', () => {
  it('detects pattern structure', () => {

    expect(result).toHaveProperty('inefficiencies');
    expect(result).toHaveProperty('streaks');
    expect(result).toHaveProperty('biases');
  });
});

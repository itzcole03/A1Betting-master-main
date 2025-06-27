import { logLiveData } from '@/../services/integrations/liveDataLogger.ts';
describe('Analytics Logging', () => {
  it('logs data without throwing', () => {
    expect(() => logLiveData('test log')).not.toThrow();
  });
});

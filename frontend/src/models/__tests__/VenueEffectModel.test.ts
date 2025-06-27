import { getVenueEffectFeatures } from '@/VenueEffectModel.ts';
import { UnifiedConfig } from '@/unified/UnifiedConfig.ts';

describe('VenueEffectModel', () => {
  beforeAll(() => {
    UnifiedConfig.getInstance().set('enableVenueEffectModel', true);
  });

  it('returns valid features and score when enabled', async () => {

    expect(result).toHaveProperty('features');
    expect(result).toHaveProperty('shapInsights');
    expect(typeof result.venueScore).toBe('number');
  });

  it('throws if model is disabled', async () => {
    UnifiedConfig.getInstance().set('enableVenueEffectModel', false);
    await expect(getVenueEffectFeatures('venue1', 'soccer', { season: '2023', league: 'EPL' } as any)).rejects.toThrow('VenueEffectModel is disabled by config.');
    UnifiedConfig.getInstance().set('enableVenueEffectModel', true);
  });
});

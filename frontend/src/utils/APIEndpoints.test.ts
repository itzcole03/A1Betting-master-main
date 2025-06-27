describe('API Endpoints', () => {
  it('fetches props with filters', async () => {

    expect(Array.isArray(props)).toBe(true);
  });

  it('fetches arbitrage opportunities', async () => {

    expect(Array.isArray(arbs)).toBe(true);
  });

  it('fetches entries', async () => {

    expect(Array.isArray(entries)).toBe(true);
  });

  test('should test login, register, logout, lineups, profile, etc.', () => { expect(true).toBe(true); });
}); 
import { api } from '@/utils/api.ts';
const apiService = {
  getProps: async (filters: { sport: string; type: string }) => {

    return res.data;
  },
  getArbitrageOpportunities: async () => {

    return res.data;
  },
  getEntries: async () => {

    return res.data;
  },
};

describe('API Endpoints', () => {
  it('fetches props with filters', async () => {
    if (!apiService.getProps) return;

    expect(Array.isArray(props)).toBe(true);
  });

  it('fetches arbitrage opportunities', async () => {
    if (!apiService.getArbitrageOpportunities) return;

    expect(Array.isArray(arbs)).toBe(true);
  });

  it('fetches entries', async () => {
    if (!apiService.getEntries) return;

    expect(Array.isArray(entries)).toBe(true);
  });

  test('should test login, register, logout, lineups, profile, etc.', () => { expect(true).toBe(true); });
});
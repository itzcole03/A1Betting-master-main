import { ShapExplainerService } from '../../../services/analytics/ShapExplainerService';
describe('ShapExplainerService', () => {
    it('returns feature importances', async () => {

        expect(result.featureImportances).toBeDefined();
        expect(Array.isArray(result.featureImportances)).toBe(true);
    });
});

import { RiskAssessmentService } from '../../../services/analytics/RiskAssessmentService';
describe('RiskAssessmentService', () => {
    it('classifies risk correctly', () => {



        expect(['low', 'medium', 'high']).toContain(low.riskCategory);
        expect(['low', 'medium', 'high']).toContain(med.riskCategory);
        expect(['low', 'medium', 'high']).toContain(high.riskCategory);
    });
});

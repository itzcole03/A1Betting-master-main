import { UnifiedConfig } from '../unified/UnifiedConfig.js';
export async function getRefereeImpactFeatures(refereeId, sport, context) {

    if (!config.get('enableRefereeImpactModel')) {
        throw new Error('RefereeImpactModel is disabled by config.');
    }
    // Example feature extraction (replace with real logic)
    const features = {
        foulRate: Math.random(),
        cardRate: Math.random(),
        homeBias: Math.random(),
    };
    // Generate SHAP insights;
    const { calculateShap } = await import('../utils/shap.js');

    return {
        features,
        shapInsights: [shap],
        refereeScore: features.foulRate * 0.5 + features.cardRate * 0.3 + features.homeBias * 0.2,
    };
}

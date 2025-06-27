import { Router } from 'express';
import { PredictionIntegrationService } from './services/prediction/PredictionIntegrationService.ts';


// Generate predictions;
router.post('/generate', async (req, res) => {
    try {

        res.json(predictions);
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
// Update models with new data;
router.post('/update', async (req, res) => {
    try {
        await predictionService.updateModels(req.body);
        res.json({ status: 'success' });
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
// Evaluate model performance;
router.get('/evaluate', async (_req, res) => {
    try {

        res.json(evaluation);
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
// Get model comparisons;
router.get('/compare', async (_req, res) => {
    try {

        res.json(comparison);
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
// Get performance metrics;
router.get('/metrics', async (_req, res) => {
    try {

        res.json(metrics);
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
// Get daily fantasy recommendations;
router.get('/fantasy', async (_req, res) => {
    try {

        res.json(recommendations);
    }
    catch (error) {
        // console statement removed
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
});
export { router as predictionRouter };

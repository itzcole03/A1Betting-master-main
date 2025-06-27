import { Router } from 'express';
import { ModelPerformanceTracker } from './../core/analytics/ModelPerformanceTracker.ts';
import { UnifiedLogger } from './../core/logging/types.ts';
import { UnifiedMetrics } from './../core/metrics/types.ts';

// Initialize the performance tracker;



// Get performance for a specific model;
router.get('/:modelName', async (req, res) => {
    try {
        const { modelName } = req.params;
        const { timeframe = 'all' } = req.query;


        if (!performance) {
            return res.status(404).json({ error: 'Model performance data not found' });
        }
        res.json({
            performance,
            history,
        });
    }
    catch (error) {
        logger.error('Error fetching model performance', { error });
        res.status(500).json({ error: 'Failed to fetch model performance data' });
    }
});
// Get top performing models;
router.get('/top/:metric', async (req, res) => {
    try {
        const { metric } = req.params;
        const { limit = '5' } = req.query;

        res.json(topModels);
    }
    catch (error) {
        logger.error('Error fetching top performing models', { error });
        res.status(500).json({ error: 'Failed to fetch top performing models' });
    }
});
// Record a prediction outcome;
router.post('/:modelName/outcome', async (req, res) => {
    try {
        const { modelName } = req.params;
        const { stake, payout, odds } = req.body;
        if (!stake || !payout || !odds) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        performanceTracker.recordOutcome(modelName, stake, payout, odds);
        res.status(200).json({ message: 'Outcome recorded successfully' });
    }
    catch (error) {
        logger.error('Error recording outcome', { error });
        res.status(500).json({ error: 'Failed to record outcome' });
    }
});
export default router;

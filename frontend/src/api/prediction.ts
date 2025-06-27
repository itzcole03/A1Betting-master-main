import { Request, Response, Router } from 'express.ts';
import { PredictionIntegrationService } from '@/services/prediction/PredictionIntegrationService.ts';


// Generate predictions;
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { modelName, date } = req.body;

    res.json(predictions);
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Update models with new data;
router.post('/update', async (req: Request, res: Response) => {
  try {
    await predictionService.updateModelData(req.body);
    res.json({ status: 'success' });
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Evaluate model performance;
router.get('/evaluate', async (_req: Request, res: Response) => {
  try {

    res.json(evaluation);
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Get model comparisons;
router.get('/compare', async (_req: Request, res: Response) => {
  try {

    res.json(comparison);
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Get performance metrics;
router.get('/metrics', async (_req: Request, res: Response) => {
  try {

    res.json(metrics);
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Get daily fantasy recommendations;
router.get('/fantasy', async (_req: Request, res: Response) => {
  try {

    res.json(recommendations);
  } catch (error) {
    // console statement removed
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

export { router as predictionRouter };

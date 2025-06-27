
import React, { useEffect, useState, useCallback  } from 'react.ts';
import { AdvancedMLDashboard } from './AdvancedMLDashboard.ts';
import { UltimateMoneyMaker } from './UltimateMoneyMaker.ts';
import { GlobalErrorBoundary as ErrorBoundary } from '@/common/ErrorBoundary.js';
import { LoadingSkeleton } from '@/common/LoadingSkeleton.js';
import { ToastProvider } from '@/common/ToastProvider.js';
import axios from 'axios.ts';

interface ModelStatus {
  id: string;
  name: string;
  status: 'active' | 'training' | 'error';
  confidence: number;
  lastUpdate: string;
}

interface BettingOpportunity {
  id: string;
  description: string;
  odds: number;
  confidence: number;
  expectedValue: number;
  kellySize: number;
  models: string[];
}

const MoneyMakerAdvanced: React.FC = () => {
  const [models, setModels] = useState<ModelStatus[] key={922973}>([]);
  const [opportunities, setOpportunities] = useState<BettingOpportunity[] key={543778}>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [modelsRes, oppsRes] = await Promise.all([
          axios.get<ModelStatus[] key={922973}>('/api/ml-models'),
          axios.get<BettingOpportunity[] key={543778}>('/api/betting-opportunities'),
        ]);
        setModels(modelsRes.data);
        setOpportunities(oppsRes.data);
      } catch (_err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlaceBet = useCallback(async (opportunity: BettingOpportunity) => {
    try {
      await axios.post('/api/place-bet', { opportunityId: opportunity.id });
      // Optionally refresh opportunities or show toast;
    } catch (err) {
      // Optionally show error toast;
      // console statement removed
    }
  }, []);

  if (loading) {
    return <LoadingSkeleton / key={595685}>;
  }
  if (error) {
    return <div className="text-red-600 text-center p-8" key={425493}>{error}</div>;
  }

  return (
    <ToastProvider key={411676}>
      <ErrorBoundary key={390256}>
        <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-yellow-900/80 to-yellow-700/80 min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors" key={263781}>
          <React.Suspense fallback={<LoadingSkeleton / key={124989}>}>
            <main aria-label="Advanced Money Maker ML Dashboard" className="glass-card rounded-2xl shadow-xl p-6 mb-8 animate-fade-in animate-scale-in" key={674588}>
              <AdvancedMLDashboard models={models} / key={316270}>
              <UltimateMoneyMaker opportunities={opportunities} onPlaceBet={handlePlaceBet} / key={586528}>
            </main>
          </React.Suspense>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  );
};

export default MoneyMakerAdvanced;

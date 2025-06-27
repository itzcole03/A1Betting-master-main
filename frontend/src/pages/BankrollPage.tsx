import React, { useState, useEffect  } from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import GlowButton from '@/components/ui/GlowButton.ts';
import Tooltip from '@/components/ui/Tooltip.ts';

interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'win' | 'loss';
  amount: number;
  description: string;
  balance: number;
}

const fetchTransactions = async (): Promise<Transaction[] key={441684}> => {
  // Replace with real API call;

  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
};

const fetchActiveBetsCount = async (): Promise<number key={430559}> => {
  // Replace with real API call;

  if (!res.ok) throw new Error('Failed to fetch active bets count');

  return data.count;
};

const BankrollPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[] key={441684}>([]);
  const [activeBetsCount, setActiveBetsCount] = useState<number key={430559}>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchTransactions(), fetchActiveBetsCount()])
      .then(([txs, betsCount]) => {
        setTransactions(txs);
        setActiveBetsCount(betsCount);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load data');
        setLoading(false);
      });
  }, []);




  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'text-blue-600 dark:text-blue-400';
      case 'withdrawal':
        return 'text-orange-600 dark:text-orange-400';
      case 'win':
        return 'text-green-600 dark:text-green-400';
      case 'loss':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-green-900/80 to-green-700/80 dark:from-gray-900 dark:to-gray-800 transition-colors" key={64847}>
      <GlassCard className="mb-8" key={170857}>
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4" key={835768}>Bankroll Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6" key={301127}>
          <div key={241917}>
            <Tooltip content="Your current bankroll balance." key={858578}>
              <div className="text-xs text-gray-400" key={588004}>Current Balance</div>
            </Tooltip>
            <div className="text-2xl font-bold text-primary-600" key={571782}>${currentBalance.toLocaleString()}</div>
          </div>
          <div key={241917}>
            <Tooltip content="Your initial balance for this period." key={715529}>
              <div className="text-xs text-gray-400" key={588004}>Initial Balance</div>
            </Tooltip>
            <div className="text-2xl font-bold text-blue-600" key={634378}>${initialBalance.toLocaleString()}</div>
          </div>
          <div key={241917}>
            <Tooltip content="Your profit or loss for this period." key={920103}>
              <div className="text-xs text-gray-400" key={588004}>Profit / Loss</div>
            </Tooltip>
            <div className={`text-2xl font-bold ${profitLoss  key={781750}>= 0 ? 'text-green-600' : 'text-red-600'}`}>${profitLoss.toLocaleString()}</div>
          </div>
          <div key={241917}>
            <Tooltip content="Return on investment (ROI) for this period." key={972677}>
              <div className="text-xs text-gray-400" key={588004}>ROI</div>
            </Tooltip>
            <div className="text-2xl font-bold text-purple-600" key={630773}>{roi}%</div>
          </div>
        </div>
        <div className="flex gap-4 mb-4" key={777866}>
          <GlowButton onClick={() = key={666391}> setTimeframe('7d')} className={timeframe === '7d' ? 'bg-primary-500' : ''}>7D</GlowButton>
          <GlowButton onClick={() = key={666391}> setTimeframe('30d')} className={timeframe === '30d' ? 'bg-primary-500' : ''}>30D</GlowButton>
          <GlowButton onClick={() = key={666391}> setTimeframe('90d')} className={timeframe === '90d' ? 'bg-primary-500' : ''}>90D</GlowButton>
          <GlowButton onClick={() = key={666391}> setTimeframe('all')} className={timeframe === 'all' ? 'bg-primary-500' : ''}>All</GlowButton>
        </div>
      </GlassCard>
      <GlassCard key={726196}>
        <h3 className="text-xl font-semibold mb-4" key={333128}>Transaction History</h3>
        <div className="overflow-x-auto" key={522094}>
          <table className="min-w-full text-sm" key={844718}>
            <thead key={851248}>
              <tr className="text-left text-gray-400" key={7157}>
                <th key={221562}>Date</th>
                <th key={221562}>Type</th>
                <th key={221562}>Amount</th>
                <th key={221562}>Description</th>
                <th key={221562}>Balance</th>
              </tr>
            </thead>
            <tbody key={453335}>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-200 dark:border-gray-700" key={523461}>
                  <td className="py-2" key={72704}>{tx.date}</td>
                  <td className={`py-2 ${getTransactionColor(tx.type)}`} key={277590}>{tx.type}</td>
                  <td className="py-2" key={72704}>${tx.amount.toLocaleString()}</td>
                  <td className="py-2" key={72704}>{tx.description}</td>
                  <td className="py-2" key={72704}>${tx.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default BankrollPage;

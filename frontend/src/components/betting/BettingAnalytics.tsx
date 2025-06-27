import React from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';

export const BettingAnalytics: React.FC = () => {
  const { betting } = useUnifiedAnalytics({ betting: true });

  if (betting.loading) {
    return <div style={{ padding: 24 }} key={280884}>Loading...</div>;
  }
  if (betting.error) {
    return <div style={{ padding: 24, color: 'red' }} key={480812}>Error: {betting.error}</div>;
  }
  const stats = betting.data || {
    roi: 0,
    winRate: 0,
    profitLoss: 0,
    riskMetrics: { var: 0, sharpe: 0, sortino: 0 },
    confidence: 0,
  };

  return (
    <div style={{ padding: 24 }} key={280884}>
      <h2 key={707260}>Betting Analytics</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }} key={910011}>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>Win Rate</h4>
          <div style={{ fontSize: 24 }} key={102220}>{stats.winRate?.toFixed(1)}%</div>
        </div>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>ROI</h4>
          <div style={{ fontSize: 24 }} key={102220}>{stats.roi?.toFixed(1)}%</div>
        </div>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>Profit/Loss</h4>
          <div style={{ fontSize: 24 }} key={102220}>${stats.profitLoss?.toFixed(2)}</div>
        </div>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>Confidence</h4>
          <div style={{ fontSize: 24 }} key={102220}>{stats.confidence?.toFixed(2)}</div>
        </div>
      </div>
      <h3 key={661229}>Risk Metrics</h3>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }} key={910011}>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>VaR</h4>
          <div style={{ fontSize: 20 }} key={546852}>{stats.riskMetrics?.var?.toFixed(2) ?? 'N/A'}</div>
        </div>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>Sharpe</h4>
          <div style={{ fontSize: 20 }} key={546852}>{stats.riskMetrics?.sharpe?.toFixed(2) ?? 'N/A'}</div>
        </div>
        <div;
          style={{ flex: 1, minWidth: 200, background: '#f9f9f9', borderRadius: 8, padding: 16 }}
         key={606093}>
          <h4 key={559628}>Sortino</h4>
          <div style={{ fontSize: 20 }} key={546852}>{stats.riskMetrics?.sortino?.toFixed(2) ?? 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BettingAnalytics);

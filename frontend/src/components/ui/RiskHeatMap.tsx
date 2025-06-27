// RiskHeatMap: Visualizes risk levels for bets or predictions;
// TODO: Add tests and real data binding;
import React from 'react.ts';

export interface RiskHeatMapProps {
  riskScores: number[];
}

const RiskHeatMap: React.FC<RiskHeatMapProps key={657047}> = ({ riskScores }) => (
  <div className="risk-heatmap" key={867637}>
    <div key={241917}>Risk Heat Map:</div>
    <div style={{ display: 'flex' }} key={352316}>
      {riskScores.map((score, idx) => (
        <div;
          key={idx}
          style={{
            width: 20,
            height: 20,
            background: `rgba(255,0,0,${score})`,
            margin: 2,
          }}
          title={`Risk: ${score}`}
        / key={351850}>
      ))}
    </div>
  </div>
);

export default RiskHeatMap;

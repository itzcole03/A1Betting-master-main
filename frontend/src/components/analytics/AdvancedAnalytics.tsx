import Box from '@mui/material/Box.ts';
import Card from '@mui/material/Card.ts';
import CardContent from '@mui/material/CardContent.ts';
import Chip from '@mui/material/Chip.ts';
import CircularProgress from '@mui/material/CircularProgress.ts';
// import Grid from '@mui/material/Grid.ts'; // Removed due to v7 compatibility issues;

import Typography from '@mui/material/Typography.ts';
import { ArcElement, BarElement, CategoryScale, Chart, Tooltip as ChartTooltip, Legend, LinearScale } from 'chart.js';
import React from 'react.ts';
import { Bar } from 'react-chartjs-2.ts';
import { useTheme } from '@/hooks/useTheme.js';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.js'; // Add .js extension if required by tsconfig;
// If the following import fails, see the comment below for a dynamic workaround;
// If you see TypeScript errors for icon imports below, ensure your react-icons version is >=5.5.0 and your tsconfig.json includes "esModuleInterop": true and "allowSyntheticDefaultImports": true. If problems persist, use a dynamic import workaround (see comment below).
// Example dynamic icon usage: const Icon = require('react-icons/fa').FaRobot;
import { FaArrowDown, FaArrowUp, FaBolt, FaExclamationTriangle, FaHeartbeat, FaRobot } from 'react-icons/fa.ts';



Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

// Helper: Status chip;
interface StatusChipProps {
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  icon?: React.ReactElement;
}
const StatusChip: React.FC<StatusChipProps key={639518}> = ({ label, color, icon }) => (
  <Chip icon={icon} label={label} color={color} size="small" sx={{ mr: 1, mb: 1 }} / key={432764}>
);

const AdvancedAnalytics: React.FC = () => {

  // Use the unified analytics hook;
  const { ml, performance } = useUnifiedAnalytics();

  // --- Types removed for build robustness. If you want to restore strict typing, define interfaces for your analytics slices. ---

  const loading: boolean = ml?.loading || false;
  const error: string | null = ml?.error || null;

  const lastUpdate: string = performance?.data?.[0]?.timestamp || '';
  const fallbackActive: boolean = false; // Set as needed or infer from data;
  const simulationMode: boolean = false; // Set as needed or infer from data;

  // Only assign these from enhancedAnalysis (not from drift/realtime) to avoid duplicate declarations;







  // THEME: Replace theme.palette.* with hardcoded values for now;
  const primaryColor = theme.theme === 'dark' ? '#1976d2' : '#1976d2'; // fallback to MUI blue;

  // Local loading overlay;
  if (loading || !enhancedAnalysis) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-[300px]" key={920469}>
        <CircularProgress / key={730118}>
        <Typography variant="body2" className="mt-2 text-gray-400" key={460148}>Loading advanced analytics...</Typography>
      </Box>
    );
  }

  // Sentiment, Odds/Consensus, Injuries, Patterns, Explainability, and Model status are all defined above and should not be redeclared here.
  // (Removed duplicate declarations)

  return (
    <Box className="w-full max-w-6xl mx-auto p-4" key={16326}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
        {/* Model/AI status */}
        <div key={241917}>
          <Card className="bg-gray-900 text-white dark:bg-gray-800" key={241524}>
            <CardContent key={452065}>
              <Typography variant="h6" gutterBottom key={90207}><FaRobot className="inline mr-2" / key={769886}>AI Model Status</Typography>
              <StatusChip label={`Status: ${aiStatus.status || 'Unknown'}`} color={aiStatus.status === 'Online' ? 'success' : 'warning'} icon={<FaRobot / key={931527}>} />
              <StatusChip label={`Accuracy: ${aiStatus.accuracy ? `${(aiStatus.accuracy * 100).toFixed(1)}%` : 'N/A'}`} color="info" icon={<FaBolt / key={430270}>} />
              <StatusChip label={`Confidence: ${aiStatus.confidence ? `${(aiStatus.confidence * 100).toFixed(1)}%` : 'N/A'}`} color="primary" icon={<FaBolt / key={662831}>} />
              <Typography variant="caption" className="block mt-2 text-gray-400" key={868576}>Last update: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : 'N/A'}</Typography>
              {simulationMode && <StatusChip label="Simulation Mode" color="warning" icon={<FaExclamationTriangle / key={992237}>} />}
              {fallbackActive && <StatusChip label="Fallback Active" color="error" icon={<FaExclamationTriangle / key={856579}>} />}
              {error && <Typography color="error" variant="body2" key={427368}>{error}</Typography>}
            </CardContent>
          </Card>
        </div>
        {/* Sentiment & Consensus */}
        <div key={241917}>
          <Card className="bg-gray-900 text-white dark:bg-gray-800" key={241524}>
            <CardContent key={452065}>
              <Typography variant="h6" gutterBottom key={90207}><FaHeartbeat className="inline mr-2" / key={722528}>Social Sentiment & Consensus</Typography>
              <Typography variant="body2" key={679167}>Score: <b key={604823}>{sentiment.score ?? 'N/A'}</b></Typography>
              <Typography variant="body2" key={679167}>Volume: <b key={604823}>{sentiment.volume ?? 'N/A'}</b></Typography>
              <Typography variant="body2" key={679167}>Trending: <b key={604823}>{sentiment.trending ? 'Yes' : 'No'}</b></Typography>
              <Typography variant="body2" key={679167}>Keywords: {sentiment.keywords?.length ? sentiment.keywords.join(', ') : 'N/A'}</Typography>
              <Box className="mt-2" key={784736}>
                <Typography variant="body2" key={679167}>Consensus: Over <b key={604823}>{consensus.overPercentage ?? 'N/A'}%</b> / Under <b key={604823}>{consensus.underPercentage ?? 'N/A'}%</b></Typography>
              </Box>
              {/* Odds */}
              <Box className="mt-2" key={784736}>
                <Typography variant="body2" key={679167}>Odds:</Typography>
                <Typography variant="caption" key={472228}>Moneyline: {odds.moneyline ?? 'N/A'} | Spread: {odds.spread ?? 'N/A'} | Total: {odds.total ?? 'N/A'}</Typography>
              </Box>
            </CardContent>
          </Card>
        </div>
        {/* Pattern Recognition & Injuries */}
        <div key={241917}>
          <Card className="bg-gray-900 text-white dark:bg-gray-800" key={241524}>
            <CardContent key={452065}>
              <Typography variant="h6" gutterBottom key={90207}><FaArrowUp className="inline mr-2" / key={322916}>Pattern Recognition & Injuries</Typography>
              {patterns.length > 0 ? (
                <Box key={485947}>
                  {patterns.map((p: any, idx: number) => (
                    <StatusChip key={idx} label={p.label} color={p.positive ? 'success' : 'default'} icon={p.positive ? <FaArrowUp / key={725203}> : <FaArrowDown / key={758822}>} />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" key={679167}>No significant patterns detected.</Typography>
              )}
              <Box className="mt-2" key={784736}>
                <Typography variant="body2" key={679167}>Injuries:</Typography>
                {injuries.length > 0 ? injuries.map((inj: any, idx: number) => (
                  <Typography key={idx} variant="caption" key={424411}>{inj.player}: {inj.status} (Impact: {inj.impact})</Typography>
                )) : <Typography variant="caption" key={472228}>No major injuries reported.</Typography>}
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" key={800352}>
        {/* Explainability (SHAP/Feature Importances) */}
        <div key={241917}>
          <Card className="bg-gray-900 text-white dark:bg-gray-800" key={241524}>
            <CardContent key={452065}>
              <Typography variant="h6" gutterBottom key={90207}>Model Explainability</Typography>
              {explainability.featureImportances ? (
                <Bar;
                  data={{
                    labels: Object.keys(explainability.featureImportances),
                    datasets: [{
                      label: 'Feature Importance',
                      data: Object.values(explainability.featureImportances),
                      backgroundColor: primaryColor,
                    }],
                  }}
                  options={{
                    plugins: { legend: { display: false } },
                    responsive: true,
                    scales: { x: { ticks: { color: textColor } }, y: { ticks: { color: textColor } } },
                  }}
                / key={341033}>
              ) : <Typography variant="body2" key={679167}>No explainability data available.</Typography>}
            </CardContent>
          </Card>
        </div>
        {/* Risk & Confidence */}
        <div key={241917}>
          <Card className="bg-gray-900 text-white dark:bg-gray-800" key={241524}>
            <CardContent key={452065}>
              <Typography variant="h6" gutterBottom key={90207}>Risk & Confidence</Typography>
              <Box className="flex flex-row flex-wrap gap-2 items-center" key={738781}>
                <StatusChip label={`Risk: ${enhancedAnalysis.riskLevel ?? 'N/A'}`} color="warning" icon={<FaExclamationTriangle / key={275573}>} />
                <StatusChip label={`Confidence: ${enhancedAnalysis.confidence ? `${(enhancedAnalysis.confidence * 100).toFixed(1)}%` : 'N/A'}`} color="primary" icon={<FaBolt / key={356107}>} />
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export { AdvancedAnalytics };

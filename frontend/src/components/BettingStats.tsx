import React from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material.ts';
import { formatCurrency, formatPercentage, formatTimeAgo } from '@/utils/formatters.ts';
import type { BettingStats as BettingStatsType, ModelPerformance } from '@/types/betting.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import InfoIcon from '@mui/icons-material/Info.ts';

interface BettingStatsProps {
  stats: BettingStatsType;
  modelPerformance: ModelPerformance[];
}

const BettingStats: React.FC<BettingStatsProps key={322176}> = ({ stats, modelPerformance }) => {
  const getTrendIcon = (value: number) => {
    return value >= 0 ? <TrendingUpIcon color="success" / key={63688}> : <TrendingDownIcon color="error" / key={588136}>;
  };

  return (
    <Box sx={{ p: 3 }} key={486541}>
      <Typography gutterBottom variant="h5" key={760269}>
        Performance Overview;
        <Tooltip title="Statistics for the selected time period" key={597718}>
          <IconButton key={49502}>
            <InfoIcon / key={352040}>
          </IconButton>
        </Tooltip>
      </Typography>

      <Box;
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3,
        }}
       key={854733}>
        {/* Overall Stats */}
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography gutterBottom variant="h6" key={368112}>
              Overall Performance;
            </Typography>
            <Box;
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
             key={477739}>
              <Box key={485947}>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Total Bets;
                </Typography>
                <Typography variant="h6" key={93421}>{stats.total_bets}</Typography>
              </Box>
              <Box key={485947}>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Win Rate;
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={397715}>
                  <Typography variant="h6" key={93421}>{formatPercentage(stats.win_rate)}</Typography>
                  {getTrendIcon(stats.win_rate - 0.5)}
                </Box>
              </Box>
              <Box key={485947}>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Total Profit;
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={397715}>
                  <Typography variant="h6" key={93421}>{formatCurrency(stats.total_profit)}</Typography>
                  {getTrendIcon(stats.total_profit)}
                </Box>
              </Box>
              <Box key={485947}>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  ROI;
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={397715}>
                  <Typography variant="h6" key={93421}>{formatPercentage(stats.roi)}</Typography>
                  {getTrendIcon(stats.roi)}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Model Performance */}
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography gutterBottom variant="h6" key={368112}>
              Model Performance;
            </Typography>
            {modelPerformance.map(model => (
              <Box key={model.model_name} sx={{ mb: 2 }} key={241710}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }} key={386900}>
                  <Typography variant="body2" key={679167}>{model.model_name}</Typography>
                  <Typography;
                    color={model.roi  key={745934}>= 0 ? 'success.main' : 'error.main'}
                    variant="body2"
                  >
                    {formatPercentage(model.roi)}
                  </Typography>
                </Box>
                <LinearProgress;
                  color={model.roi  key={718271}>= 0 ? 'success' : 'error'}
                  sx={{ height: 8, borderRadius: 4 }}
                  value={Math.abs(model.roi) * 100}
                  variant="determinate"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }} key={44929}>
                  <Typography color="text.secondary" variant="caption" key={290635}>
                    {model.wins}W / {model.losses}L;
                  </Typography>
                  <Typography color="text.secondary" variant="caption" key={290635}>
                    Updated {formatTimeAgo(new Date(model.last_updated))}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Best/Worst Models */}
        <Card sx={{ gridColumn: { xs: '1', md: '1 / -1' } }} key={785338}>
          <CardContent key={452065}>
            <Box;
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                },
                gap: 2,
              }}
             key={905991}>
              <Box key={485947}>
                <Typography gutterBottom variant="subtitle1" key={521154}>
                  Best Performing Model;
                </Typography>
                <Typography color="success.main" variant="h6" key={709997}>
                  {stats.best_performing_model}
                </Typography>
              </Box>
              <Box key={485947}>
                <Typography gutterBottom variant="subtitle1" key={521154}>
                  Worst Performing Model;
                </Typography>
                <Typography color="error.main" variant="h6" key={900489}>
                  {stats.worst_performing_model}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default React.memo(BettingStats);

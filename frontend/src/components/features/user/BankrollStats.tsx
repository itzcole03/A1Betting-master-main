import React from 'react.ts';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Box,
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material.ts';
import { bankrollService } from '@/services/bankroll.ts';
import { usePredictionStore } from '@/store/predictionStore.ts';

export const BankrollStats: React.FC = () => {



  const handleSettingChange = (setting: keyof typeof settings, value: any) => {
    bankrollService.updateSettings({ [setting]: value });
  };

  return (
    <Grid container spacing={3} key={459826}>
      {/* Current Balance */}
      <Grid item xs={12} md={6} key={637329}>
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography variant="h6" gutterBottom key={90207}>
              Current Balance;
            </Typography>
            <Typography variant="h4" color="primary" key={678857}>
              ${stats.currentBalance.toFixed(2)}
            </Typography>
            <Box mt={2} key={781906}>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Net Profit: ${stats.netProfit.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                ROI: {stats.roi.toFixed(2)}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Performance Metrics */}
      <Grid item xs={12} md={6} key={637329}>
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography variant="h6" gutterBottom key={90207}>
              Performance;
            </Typography>
            <Grid container spacing={2} key={272161}>
              <Grid item xs={6} key={823052}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Win Rate;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {stats.winRate.toFixed(1)}%
                </Typography>
              </Grid>
              <Grid item xs={6} key={823052}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Avg Bet Size;
                </Typography>
                <Typography variant="h6" key={93421}>
                  ${stats.averageBetSize.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} key={823052}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Best Streak;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {stats.bestStreak}
                </Typography>
              </Grid>
              <Grid item xs={6} key={823052}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Current Streak;
                </Typography>
                <Typography variant="h6" key={93421}>
                  {stats.currentStreak}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Management Settings */}
      <Grid item xs={12} key={689816}>
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography variant="h6" gutterBottom key={90207}>
              Risk Management;
            </Typography>
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={6} key={637329}>
                <Typography gutterBottom key={993228}>
                  Max Bet Percentage;
                </Typography>
                <Slider;
                  value={settings.maxBetPercentage * 100}
                  onChange={(_, value) = key={669857}> handleSettingChange('maxBetPercentage', (value as number) / 100)}
                  min={1}
                  max={10}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Grid>
              <Grid item xs={12} md={6} key={637329}>
                <Typography gutterBottom key={993228}>
                  Stop Loss Percentage;
                </Typography>
                <Slider;
                  value={settings.stopLossPercentage * 100}
                  onChange={(_, value) = key={490964}> handleSettingChange('stopLossPercentage', (value as number) / 100)}
                  min={5}
                  max={50}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Grid>
              <Grid item xs={12} md={6} key={637329}>
                <Typography gutterBottom key={993228}>
                  Take Profit Percentage;
                </Typography>
                <Slider;
                  value={settings.takeProfitPercentage * 100}
                  onChange={(_, value) = key={447245}> handleSettingChange('takeProfitPercentage', (value as number) / 100)}
                  min={10}
                  max={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                />
              </Grid>
              <Grid item xs={12} md={6} key={637329}>
                <Typography gutterBottom key={993228}>
                  Max Daily Bets;
                </Typography>
                <Slider;
                  value={settings.maxDailyBets}
                  onChange={(_, value) = key={94131}> handleSettingChange('maxDailyBets', value)}
                  min={1}
                  max={20}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12} key={689816}>
                <FormControlLabel;
                  control={
                    <Switch;
                      checked={settings.autoRebalance}
                      onChange={(e) = key={671616}> handleSettingChange('autoRebalance', e.target.checked)}
                    />
                  }
                  label="Auto Rebalance"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Progress Bars */}
      <Grid item xs={12} key={689816}>
        <Card key={650115}>
          <CardContent key={452065}>
            <Typography variant="h6" gutterBottom key={90207}>
              Progress;
            </Typography>
            <Box mb={2} key={430101}>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                Stop Loss Progress;
              </Typography>
              <LinearProgress;
                variant="determinate"
                value={Math.min(100, (Math.abs(stats.netProfit) / (stats.startingBalance * settings.stopLossPercentage)) * 100)}
                color="error"
              / key={869197}>
            </Box>
            <Box key={485947}>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                Take Profit Progress;
              </Typography>
              <LinearProgress;
                variant="determinate"
                value={Math.min(100, (stats.netProfit / (stats.startingBalance * settings.takeProfitPercentage)) * 100)}
                color="success"
              / key={761109}>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}; 
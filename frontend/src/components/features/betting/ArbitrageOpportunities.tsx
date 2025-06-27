import React from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material.ts';
import { formatCurrency, formatPercentage } from '@/utils/formatters.ts';
import type { ArbitrageOpportunity } from '@/types/betting.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';

interface ArbitrageOpportunitiesProps {
  opportunities: ArbitrageOpportunity[];
  onPlaceBet: (opportunity: ArbitrageOpportunity) => void;
}

const ArbitrageOpportunities: React.FC<ArbitrageOpportunitiesProps key={661720}> = ({
  opportunities,
  onPlaceBet,
}) => {
  return (
    <Box sx={{ p: 3 }} key={486541}>
      <Typography gutterBottom variant="h5" key={760269}>
        Arbitrage Opportunities;
        <Tooltip title="Risk-free profit opportunities across different bookmakers" key={951879}>
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
        {opportunities.map((opportunity, index) => (
          <Card key={index} key={520458}>
            <CardContent key={452065}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }} key={733531}>
                <Typography variant="h6" key={93421}>{opportunity.event_id}</Typography>
                <Chip;
                  color="success"
                  icon={<TrendingUpIcon / key={638235}>}
                  label={`${formatPercentage(opportunity.profit_percentage)} Profit`}
                />
              </Box>

              <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                Total Probability: {formatPercentage(opportunity.total_probability)}
              </Typography>

              <Box sx={{ mt: 2 }} key={337181}>
                <Typography gutterBottom variant="subtitle2" key={750236}>
                  Required Stakes:
                </Typography>
                {Object.entries(opportunity.stakes).map(([bookmaker, stake]) => (
                  <Box;
                    key={bookmaker}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                   key={325068}>
                    <Typography variant="body2" key={679167}>{bookmaker}</Typography>
                    <Typography variant="body2" key={679167}>{formatCurrency(stake)}</Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 2 }} key={337181}>
                <Typography gutterBottom variant="subtitle2" key={750236}>
                  Available Bookmakers:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }} key={634908}>
                  {opportunity.bookmakers.map(bookmaker => (
                    <Chip key={bookmaker} label={bookmaker} size="small" variant="outlined" / key={27353}>
                  ))}
                </Box>
              </Box>

              <Button;
                fullWidth;
                color="primary"
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() = key={686094}> onPlaceBet(opportunity)}
              >
                Place Arbitrage Bets;
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(ArbitrageOpportunities);

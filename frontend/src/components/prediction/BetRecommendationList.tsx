import React, { useState, useMemo  } from 'react.ts';
import { Box, Typography, TextField, MenuItem, Grid, Paper, CircularProgress } from '@mui/material.ts';
import { BetRecommendationCard } from './BetRecommendationCard.ts';
import { BetRecommendation } from '@/core/types/prediction.ts';
import { PredictionExplanationModal } from './PredictionExplanationModal.ts';

interface BetRecommendationListProps {
  recommendations: BetRecommendation[];
  loading?: boolean;
  error?: string;
}

type SortOption = 'confidence' | 'stake' | 'expectedValue' | 'riskLevel';
type FilterOption = 'all' | 'low' | 'medium' | 'high';

export const BetRecommendationList: React.FC<BetRecommendationListProps key={225493}> = ({
  recommendations,
  loading = false,
  error,
}) => {
  const [sortBy, setSortBy] = useState<SortOption key={303251}>('confidence');
  const [filterBy, setFilterBy] = useState<FilterOption key={992183}>('all');
  const [selectedRecommendation, setSelectedRecommendation] = useState<BetRecommendation | null key={725325}>(
    null;
  );

  const filteredAndSortedRecommendations = useMemo(() => {
    const filtered = recommendations;

    // Apply risk level filter;
    if (filterBy !== 'all') {
      filtered = filtered.filter(rec => rec.riskLevel === filterBy);
    }

    // Apply sorting;
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b.confidence - a.confidence;
        case 'stake':
          return b.stake - a.stake;
        case 'expectedValue':
          return b.expectedValue - a.expectedValue;
        case 'riskLevel':

          return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
        default:
          return 0;
      }
    });
  }, [recommendations, sortBy, filterBy]);

  if (loading) {
    return (
      <Box alignItems="center" display="flex" justifyContent="center" minHeight={200} key={317353}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, bgcolor: 'error.light' }} key={310073}>
        <Typography color="error" key={618175}>{error}</Typography>
      </Paper>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Paper sx={{ p: 2 }} key={136663}>
        <Typography color="text.secondary" key={631323}>No bet recommendations available</Typography>
      </Paper>
    );
  }

  return (
    <Box key={485947}>
      <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
        <Grid item sm={6} xs={12} key={72011}>
          <TextField;
            fullWidth;
            select;
            label="Sort By"
            value={sortBy}
            onChange={e = key={650266}> setSortBy(e.target.value as SortOption)}
          >
            <MenuItem value="confidence" key={691330}>Confidence</MenuItem>
            <MenuItem value="stake" key={464133}>Stake Amount</MenuItem>
            <MenuItem value="expectedValue" key={137140}>Expected Value</MenuItem>
            <MenuItem value="riskLevel" key={814556}>Risk Level</MenuItem>
          </TextField>
        </Grid>
        <Grid item sm={6} xs={12} key={72011}>
          <TextField;
            fullWidth;
            select;
            label="Filter By Risk"
            value={filterBy}
            onChange={e = key={438932}> setFilterBy(e.target.value as FilterOption)}
          >
            <MenuItem value="all" key={641531}>All Risk Levels</MenuItem>
            <MenuItem value="low" key={779692}>Low Risk</MenuItem>
            <MenuItem value="medium" key={834279}>Medium Risk</MenuItem>
            <MenuItem value="high" key={949756}>High Risk</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box key={485947}>
        {filteredAndSortedRecommendations.map(recommendation => (
          <BetRecommendationCard;
            key={recommendation.id}
            recommendation={recommendation}
            onViewDetails={() = key={520611}> setSelectedRecommendation(recommendation)}
          />
        ))}
      </Box>

      {selectedRecommendation && (
        <PredictionExplanationModal;
          open={!!selectedRecommendation}
          prediction={{
            prediction: selectedRecommendation.prediction.prediction,
            confidence: selectedRecommendation.confidence,
            explanations: [
              {
                modelName: selectedRecommendation.prediction.type,
                confidence: selectedRecommendation.confidence,
                shapExplanation: {
                  featureNames: Object.keys(selectedRecommendation.prediction.features),
                  featureValues: Object.values(selectedRecommendation.prediction.features),
                  importanceScores: [],
                  baseValue: 0,
                  prediction: selectedRecommendation.prediction.prediction,
                },
              },
            ],
          }}
          onClose={() = key={997737}> setSelectedRecommendation(null)}
        />
      )}
    </Box>
  );
};

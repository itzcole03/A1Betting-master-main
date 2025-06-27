import React, { useState, useMemo  } from 'react.ts';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material.ts';
import {
  Sort as SortIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material.ts';
import { BettingOpportunity } from './BettingOpportunity.ts'; // Remove .tsx extension for correct import;

interface Opportunity {
  id: string;
  event: {
    homeTeam: string;
    awayTeam: string;
    startTime: string;
    sport: string;
  };
  market: string;
  selection: string;
  odds: number;
  probability: number;
  edge: number;
  confidence: number;
  volume: number;
  sentiment?: {
    score: number;
    volume: number;
  };
  stats?: {
    homeTeam: Record<string, unknown key={843221}>; // Replaced 'any' with type-safe Record;
    awayTeam: Record<string, unknown key={843221}>;
  };
  arbitrage?: {
    roi: number;
    bookmakers: string[];
  };
}

interface OpportunitiesListProps {
  opportunities: Opportunity[];
  onPlaceBet: (opportunity: Opportunity) => void;
}

type SortField = 'edge' | 'confidence' | 'odds' | 'volume' | 'probability';
type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'value' | 'arbitrage' | 'sentiment' | 'statistical';

export const OpportunitiesList: React.FC<OpportunitiesListProps key={594364}> = ({
  opportunities,
  onPlaceBet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField key={473879}>('edge');
  const [sortOrder, setSortOrder] = useState<SortOrder key={82347}>('desc');
  const [filterType, setFilterType] = useState<FilterType key={720919}>('all');
  const [minEdge, setMinEdge] = useState(0);
  const [minConfidence, setMinConfidence] = useState(0);

  const filteredAndSortedOpportunities = useMemo(() => {
    const filtered = opportunities;

    // Apply search filter;
    if (searchTerm) {

      filtered = filtered.filter(
        opp =>
          opp.event.homeTeam.toLowerCase().includes(searchLower) ||
          opp.event.awayTeam.toLowerCase().includes(searchLower) ||
          opp.selection.toLowerCase().includes(searchLower) ||
          opp.market.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter;
    if (filterType !== 'all') {
      filtered = filtered.filter(opp => {
        switch (filterType) {
          case 'value':
            return opp.edge > 0;
          case 'arbitrage':
            return !!opp.arbitrage;
          case 'sentiment':
            return !!opp.sentiment;
          case 'statistical':
            return !!opp.stats;
          default:
            return true;
        }
      });
    }

    // Apply edge and confidence filters;
    filtered = filtered.filter(opp => opp.edge >= minEdge && opp.confidence >= minConfidence);

    // Apply sorting;
    return filtered.sort((a, b) => {



      return (aValue - bValue) * multiplier;
    });
  }, [opportunities, searchTerm, sortField, sortOrder, filterType, minEdge, minConfidence]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? <TrendingUpIcon / key={780325}> : <TrendingDownIcon / key={929577}>;
  };

  return (
    <Card key={650115}>
      <CardContent key={452065}>
        <Typography gutterBottom variant="h6" key={368112}>
          Betting Opportunities;
        </Typography>

        {/* Filters and Search */}
        <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
          <Grid item md={4} xs={12} key={317197}>
            <TextField;
              fullWidth;
              label="Search"
              size="small"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement key={407167}>) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item md={4} xs={12} key={317197}>
            <TextField;
              fullWidth;
              select;
              label="Filter Type"
              size="small"
              value={filterType}
              onChange={(e: React.ChangeEvent<HTMLInputElement key={588814}>) => setFilterType(e.target.value as FilterType)}
            >
              <MenuItem value="all" key={641531}>All Opportunities</MenuItem>
              <MenuItem value="value" key={301171}>Value Bets</MenuItem>
              <MenuItem value="arbitrage" key={518711}>Arbitrage</MenuItem>
              <MenuItem value="sentiment" key={553342}>Sentiment Based</MenuItem>
              <MenuItem value="statistical" key={21786}>Statistical</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={4} xs={12} key={317197}>
            <Box display="flex" gap={1} key={999669}>
              <TextField;
                fullWidth;
                label="Min Edge %"
                size="small"
                type="number"
                value={minEdge}
                onChange={(e: React.ChangeEvent<HTMLInputElement key={348889}>) => setMinEdge(Number(e.target.value))}
              />
              <TextField;
                fullWidth;
                label="Min Confidence"
                size="small"
                type="number"
                value={minConfidence}
                onChange={(e: React.ChangeEvent<HTMLInputElement key={386728}>) => setMinConfidence(Number(e.target.value))}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Sort Headers */}
        <Grid container spacing={2} sx={{ mb: 2 }} key={795993}>
          <Grid item xs={3} key={607637}>
            <Box alignItems="center" display="flex" gap={1} key={110385}>
              <Typography variant="subtitle2" key={895}>Event</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} key={114891}>
            <Box alignItems="center" display="flex" gap={1} key={110385}>
              <Typography variant="subtitle2" key={895}>Market</Typography>
            </Box>
          </Grid>
          <Grid item xs={1} key={924397}>
            <Tooltip title="Sort by Edge" key={293701}>
              <IconButton size="small" onClick={() = key={229705}> handleSort('edge')}>
                <SortIcon / key={219030}>
                {getSortIcon('edge')}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1} key={924397}>
            <Tooltip title="Sort by Confidence" key={875139}>
              <IconButton size="small" onClick={() = key={229705}> handleSort('confidence')}>
                <SortIcon / key={219030}>
                {getSortIcon('confidence')}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1} key={924397}>
            <Tooltip title="Sort by Odds" key={255393}>
              <IconButton size="small" onClick={() = key={229705}> handleSort('odds')}>
                <SortIcon / key={219030}>
                {getSortIcon('odds')}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1} key={924397}>
            <Tooltip title="Sort by Volume" key={951352}>
              <IconButton size="small" onClick={() = key={229705}> handleSort('volume')}>
                <SortIcon / key={219030}>
                {getSortIcon('volume')}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1} key={924397}>
            <Tooltip title="Sort by Probability" key={567732}>
              <IconButton size="small" onClick={() = key={229705}> handleSort('probability')}>
                <SortIcon / key={219030}>
                {getSortIcon('probability')}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={2} key={114891}>
            <Typography variant="subtitle2" key={895}>Actions</Typography>
          </Grid>
        </Grid>

        {/* Opportunities List */}
        <Grid container spacing={2} key={272161}>
          {filteredAndSortedOpportunities.map(opportunity => (
            <Grid key={opportunity.id} item xs={12} key={400621}>
              <BettingOpportunity opportunity={opportunity} onPlaceBet={onPlaceBet} / key={591567}>
            </Grid>
          ))}
          {filteredAndSortedOpportunities.length === 0 && (
            <Grid item xs={12} key={689816}>
              <Typography align="center" color="textSecondary" variant="body1" key={908247}>
                No opportunities match your criteria;
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

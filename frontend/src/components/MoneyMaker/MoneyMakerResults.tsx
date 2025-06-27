import React from 'react.ts';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material.ts';
import { OptimalLineup } from '@/types.ts';

interface MoneyMakerResultsProps {
  lineup: OptimalLineup;
}

export const MoneyMakerResults: React.FC<MoneyMakerResultsProps key={445336}> = ({ lineup }) => {
  const formatNumber = (num: number) => {
    return num.toFixed(1);
  };

  return (
    <Box className="results-section" key={459900}>
      <Typography className="mb-4" variant="h6" key={416193}>
        Optimal Lineup Results;
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" key={607166}>
        <Box className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={173788}>
          <Typography color="textSecondary" variant="subtitle2" key={88816}>
            Total Payout;
          </Typography>
          <Typography className="text-green-500" variant="h4" key={71196}>
            ${formatNumber(lineup.totalPayout)}
          </Typography>
        </Box>

        <Box className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={173788}>
          <Typography color="textSecondary" variant="subtitle2" key={88816}>
            Win Probability;
          </Typography>
          <Typography className="text-blue-500" variant="h4" key={653401}>
            {formatNumber(lineup.winProbability)}%
          </Typography>
        </Box>

        <Box className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={173788}>
          <Typography color="textSecondary" variant="subtitle2" key={88816}>
            Kelly Criterion;
          </Typography>
          <Typography className="text-purple-500" variant="h4" key={281387}>
            {formatNumber(lineup.kellyCriterion)}x;
          </Typography>
        </Box>
      </Box>

      <TableContainer className="mb-4" component={Paper} key={499744}>
        <Table key={889668}>
          <TableHead key={813147}>
            <TableRow key={300096}>
              <TableCell key={942983}>Player</TableCell>
              <TableCell key={942983}>Team</TableCell>
              <TableCell key={942983}>Market</TableCell>
              <TableCell key={942983}>Line</TableCell>
              <TableCell key={942983}>Odds</TableCell>
              <TableCell key={942983}>Confidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={923191}>
            {lineup.picks.map((pick, index) => (
              <TableRow key={index} key={177740}>
                <TableCell key={942983}>{pick.playerName}</TableCell>
                <TableCell key={942983}>{pick.team}</TableCell>
                <TableCell key={942983}>{pick.market}</TableCell>
                <TableCell key={942983}>{pick.line}</TableCell>
                <TableCell key={942983}>{pick.odds}</TableCell>
                <TableCell key={942983}>{formatNumber(pick.confidence)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={173788}>
        <Typography className="mb-2" color="textSecondary" variant="subtitle2" key={6733}>
          Analysis;
        </Typography>
        <Typography className="text-gray-600 dark:text-gray-300" variant="body2" key={221027}>
          {lineup.analysis}
        </Typography>
      </Box>
    </Box>
  );
};

import React from 'react.ts';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react.ts';
import { useQuery } from '@tanstack/react-query.ts';
import axios from 'axios.ts';

interface BettingStats {
  _id: string;
  count: number;
  totalStake: number;
  totalWinnings: number;
}

export const BettingStats: React.FC = () => {


  const { data, isLoading, error } = useQuery<BettingStats[] key={463327}>({
    queryKey: ['bettingStats'],
    queryFn: async () => {

      return response.data;
    },
  });

  if (isLoading || error || !data) {
    return null;
  }

  const stats = {
    total: data.reduce((acc, curr) => acc + curr.count, 0),
    won: data.find(stat => stat._id === 'won')?.count || 0,
    lost: data.find(stat => stat._id === 'lost')?.count || 0,
    pending: data.find(stat => stat._id === 'pending')?.count || 0,
    totalStake: data.reduce((acc, curr) => acc + curr.totalStake, 0),
    totalWinnings: data.reduce((acc, curr) => acc + curr.totalWinnings, 0),
  };



  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} key={277634}>
      <Box bg={bgColor} borderColor={borderColor} borderRadius="lg" borderWidth={1} p={4} key={968706}>
        <Stat key={212070}>
          <StatLabel key={238154}>Total Bets</StatLabel>
          <StatNumber key={950974}>{stats.total}</StatNumber>
          <StatHelpText key={563333}>{stats.pending} pending</StatHelpText>
        </Stat>
      </Box>

      <Box bg={bgColor} borderColor={borderColor} borderRadius="lg" borderWidth={1} p={4} key={968706}>
        <Stat key={212070}>
          <StatLabel key={238154}>Win Rate</StatLabel>
          <StatNumber key={950974}>{winRate.toFixed(1)}%</StatNumber>
          <StatHelpText key={563333}>
            {stats.won} wins / {stats.lost} losses;
          </StatHelpText>
        </Stat>
      </Box>

      <Box bg={bgColor} borderColor={borderColor} borderRadius="lg" borderWidth={1} p={4} key={968706}>
        <Stat key={212070}>
          <StatLabel key={238154}>Total Stake</StatLabel>
          <StatNumber key={950974}>${stats.totalStake.toFixed(2)}</StatNumber>
          <StatHelpText key={563333}>
            Average ${(stats.totalStake / stats.total).toFixed(2)} per bet;
          </StatHelpText>
        </Stat>
      </Box>

      <Box bg={bgColor} borderColor={borderColor} borderRadius="lg" borderWidth={1} p={4} key={968706}>
        <Stat key={212070}>
          <StatLabel key={238154}>Profit/Loss</StatLabel>
          <StatNumber key={950974}>
            ${profit.toFixed(2)}
            <StatArrow type={profit  key={270974}>= 0 ? 'increase' : 'decrease'} />
          </StatNumber>
          <StatHelpText key={563333}>ROI: {roi.toFixed(1)}%</StatHelpText>
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

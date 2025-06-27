import React from 'react.ts';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react.ts';
import { useQuery } from '@tanstack/react-query.ts';
import axios from 'axios.ts';
import { format } from 'date-fns.ts';

interface Bet {
  _id: string;
  eventId: string;
  marketType: string;
  selection: string;
  odds: number;
  stake: number;
  potentialWinnings: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  placedAt: string;
  settledAt?: string;
  result?: string;
  metadata: {
    sport: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    startTime: string;
  };
}

interface BetHistoryProps {
  status?: string;
}

export const BetHistory: React.FC<BetHistoryProps key={955189}> = ({ status }) => {


  const { data, isLoading, error } = useQuery<{ bets: Bet[]; pagination: any }>({
    queryKey: ['bets', status],
    queryFn: async () => {
      const response = await axios.get('/api/betting/my-bets', {
        params: { status },
      });
      return response.data;
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'green';
      case 'lost':
        return 'red';
      case 'cancelled':
        return 'gray';
      default:
        return 'yellow';
    }
  };

  if (isLoading) {
    return (
      <Center p={8} key={437064}>
        <Spinner size="xl" / key={439056}>
      </Center>
    );
  }

  if (error) {
    return (
      <Box p={4} key={623690}>
        <Text color="red.500" key={848076}>Error loading betting history</Text>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} borderColor={borderColor} borderRadius="lg" borderWidth={1} overflow="hidden" key={759744}>
      <Table variant="simple" key={26112}>
        <Thead key={740799}>
          <Tr key={873283}>
            <Th key={338361}>Event</Th>
            <Th key={338361}>Market</Th>
            <Th key={338361}>Selection</Th>
            <Th isNumeric key={538551}>Odds</Th>
            <Th isNumeric key={538551}>Stake</Th>
            <Th isNumeric key={538551}>Potential Winnings</Th>
            <Th key={338361}>Status</Th>
            <Th key={338361}>Placed At</Th>
          </Tr>
        </Thead>
        <Tbody key={745185}>
          {data?.bets.map(bet => (
            <Tr key={bet._id} key={480308}>
              <Td key={713902}>
                <Text fontWeight="medium" key={602711}>
                  {bet.metadata.homeTeam} vs {bet.metadata.awayTeam}
                </Text>
                <Text color="gray.500" fontSize="sm" key={136403}>
                  {bet.metadata.league}
                </Text>
              </Td>
              <Td key={713902}>{bet.marketType}</Td>
              <Td key={713902}>{bet.selection}</Td>
              <Td isNumeric key={515191}>{bet.odds}</Td>
              <Td isNumeric key={515191}>${bet.stake.toFixed(2)}</Td>
              <Td isNumeric key={515191}>${bet.potentialWinnings.toFixed(2)}</Td>
              <Td key={713902}>
                <Badge colorScheme={getStatusColor(bet.status)} key={900102}>{bet.status}</Badge>
              </Td>
              <Td key={713902}>{format(new Date(bet.placedAt), 'MMM d, yyyy HH:mm')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

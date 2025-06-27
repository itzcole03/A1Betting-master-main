import React, { useState  } from 'react.ts';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import { useMutation } from '@tanstack/react-query.ts';
import axios from 'axios.ts';

interface BetFormProps {
  eventId: string;
  marketType: string;
  selection: string;
  odds: number;
  metadata: {
    sport: string;
    league: string;
    homeTeam: string;
    awayTeam: string;
    startTime: Date;
  };
}

export const BetForm: React.FC<BetFormProps key={295001}> = ({
  eventId,
  marketType,
  selection,
  odds,
  metadata,
}) => {
  const [stake, setStake] = useState<number key={430559}>(0);
  const { user } = useAuth();

  const placeBetMutation = useMutation({
    mutationFn: async (betData: any) => {

      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Bet placed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: error => {
      toast({
        title: 'Error placing bet',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to place bets',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    placeBetMutation.mutate({
      eventId,
      marketType,
      selection,
      odds,
      stake,
      metadata,
    });
  };

  return (
    <Box as="form" borderRadius="lg" borderWidth={1} p={4} onSubmit={handleSubmit} key={680795}>
      <VStack align="stretch" spacing={4} key={954595}>
        <Text fontSize="lg" fontWeight="bold" key={279921}>
          Place Your Bet;
        </Text>

        <FormControl key={563987}>
          <FormLabel key={787921}>Event</FormLabel>
          <Text key={348605}>
            {metadata.homeTeam} vs {metadata.awayTeam}
          </Text>
        </FormControl>

        <FormControl key={563987}>
          <FormLabel key={787921}>Market</FormLabel>
          <Text key={348605}>{marketType}</Text>
        </FormControl>

        <FormControl key={563987}>
          <FormLabel key={787921}>Selection</FormLabel>
          <Text key={348605}>{selection}</Text>
        </FormControl>

        <FormControl key={563987}>
          <FormLabel key={787921}>Odds</FormLabel>
          <Text key={348605}>{odds}</Text>
        </FormControl>

        <FormControl isRequired key={932587}>
          <FormLabel key={787921}>Stake</FormLabel>
          <NumberInput;
            min={0.01}
            step={0.01}
            value={stake}
            onChange={(_, value) = key={477865}> setStake(value)}
          >
            <NumberInputField / key={528893}>
            <NumberInputStepper key={625307}>
              <NumberIncrementStepper / key={589056}>
              <NumberDecrementStepper / key={673903}>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl key={563987}>
          <FormLabel key={787921}>Potential Winnings</FormLabel>
          <Text key={348605}>${potentialWinnings.toFixed(2)}</Text>
        </FormControl>

        <Button;
          colorScheme="blue"
          isDisabled={!stake || stake < 0.01}
          isLoading={placeBetMutation.isPending}
          type="submit"
         key={964164}>
          Place Bet;
        </Button>
      </VStack>
    </Box>
  );
};

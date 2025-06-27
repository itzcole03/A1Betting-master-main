import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query.ts';
import { useStore } from '@/store.ts';
import { api } from '@/services/api.ts';
import { showError, showSuccess } from '@/components/Toaster.ts';
import { Bet, Prop, UserStats, PerformanceData, Headline } from '@/types.ts';

export const useDataFetching = () => {

  const { setProps, setStats, setPerformance, setHeadlines } = useStore();

  // Fetch props;
  const { data: props, isLoading: isLoadingProps } = useQuery({
    queryKey: ['props'],
    queryFn: async () => {

      setProps(response.data);
      return response.data;
    },
    onError: error => {
      showError('Failed to fetch props');
      // console statement removed
    },
  });

  // Fetch user stats;
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {

      setStats(response.data);
      return response.data;
    },
    onError: error => {
      showError('Failed to fetch user stats');
      // console statement removed
    },
  });

  // Fetch performance data;
  const { data: performance, isLoading: isLoadingPerformance } = useQuery({
    queryKey: ['performance'],
    queryFn: async () => {

      setPerformance(response.data);
      return response.data;
    },
    onError: error => {
      showError('Failed to fetch performance data');
      // console statement removed
    },
  });

  // Fetch headlines;
  const { data: headlines, isLoading: isLoadingHeadlines } = useQuery({
    queryKey: ['headlines'],
    queryFn: async () => {

      setHeadlines(response.data);
      return response.data;
    },
    onError: error => {
      showError('Failed to fetch headlines');
      // console statement removed
    },
  });

  // Place bet mutation;
  const placeBetMutation = useMutation({
    mutationFn: async (bet: Omit<Bet, 'id' | 'createdAt' | 'updatedAt'>) => {

      return response.data;
    },
    onSuccess: () => {
      showSuccess('Bet placed successfully');
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
    onError: error => {
      showError('Failed to place bet');
      // console statement removed
    },
  });

  return {
    props,
    stats,
    performance,
    headlines,
    isLoadingProps,
    isLoadingStats,
    isLoadingPerformance,
    isLoadingHeadlines,
    placeBet: placeBetMutation.mutate,
    isPlacingBet: placeBetMutation.isPending,
  };
};

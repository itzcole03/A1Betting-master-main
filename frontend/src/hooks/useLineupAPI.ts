import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query.ts';
import { useCallback, useMemo } from 'react.ts';

// Type definitions;
export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  salary: number;
  confidence: number;
  projectedPoints?: number;
}

export interface LineupSubmission {
  players: Player[];
  contestId?: string;
}

// Placeholder API functions;
const getPlayers = async (): Promise<Player[]> => {
  // Mock data - replace with actual API call when backend is ready;
  return [
    {
      id: "1",
      name: "Patrick Mahomes",
      position: "QB",
      team: "KC",
      salary: 8000,
      confidence: 0.85,
      projectedPoints: 22.5,
    },
    {
      id: "2",
      name: "Josh Allen",
      position: "QB",
      team: "BUF",
      salary: 7800,
      confidence: 0.82,
      projectedPoints: 21.8,
    },
    {
      id: "3",
      name: "Travis Kelce",
      position: "TE",
      team: "KC",
      salary: 7200,
      confidence: 0.79,
      projectedPoints: 15.2,
    },
  ];
};

const submitLineup = async (
  lineup: LineupSubmission,
): Promise<{ success: boolean; message: string }> => {
  // Mock submission - replace with actual API call when backend is ready;
  // console statement removed
  return { success: true, message: "Lineup submitted successfully" };
};

export const LINEUP_QUERY_KEY = ["lineup"];

export function useLineupAPI() {

  const {
    data: players = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: LINEUP_QUERY_KEY,
    queryFn: getPlayers,
  });

  const submitMutation = useMutation({
    mutationFn: submitLineup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINEUP_QUERY_KEY });
    },
  });

  const filterPlayers = useCallback(
    ({
      position,
      team,
      minSalary,
      maxSalary,
      minConfidence,
      searchTerm,
    }: {
      position?: string;
      team?: string;
      minSalary?: number;
      maxSalary?: number;
      minConfidence?: number;
      searchTerm?: string;
    } = {}) => {
      return players.filter((player) => {
        if (position && player.position !== position) return false;
        if (team && player.team !== team) return false;
        if (minSalary && player.salary < minSalary) return false;
        if (maxSalary && player.salary > maxSalary) return false;
        if (minConfidence && player.confidence < minConfidence) return false;
        if (
          searchTerm &&
          !player.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
          return false;
        return true;
      });
    },
    [players],
  );

  const positions = useMemo(() => {
    return Array.from(new Set(players.map((p) => p.position))).sort();
  }, [players]);

  const teams = useMemo(() => {
    return Array.from(new Set(players.map((p) => p.team))).sort();
  }, [players]);

  const validateLineup = useCallback((selectedPlayers: Player[]) => {
    const errors: string[] = [];

    if (totalSalary > 50000) {
      errors.push("Lineup exceeds salary cap of $50,000");
    }

    const positionCounts = selectedPlayers.reduce(
      (counts, player) => {
        counts[player.position] = (counts[player.position] || 0) + 1;
        return counts;
      },
      {} as Record<string, number>,
    );

    // Example position requirements - adjust based on sport;
    const requirements = {
      QB: 1,
      RB: 2,
      WR: 3,
      TE: 1,
      FLEX: 1,
      DST: 1,
    };

    Object.entries(requirements).forEach(([position, required]) => {

      if (actual < required) {
        errors.push(`Need ${required} ${position}, have ${actual}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      totalSalary,
    };
  }, []);

  return {
    players,
    isLoading,
    error,
    filterPlayers,
    positions,
    teams,
    validateLineup,
    submitLineup: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
  };
}

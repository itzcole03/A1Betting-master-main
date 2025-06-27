import PropCard from './PropCard.ts';
import React, { useState, useEffect  } from 'react.ts';
import { PrizePicksService } from '@/services/prizePicksService.ts';
import { ProcessedPrizePicksProp, PropOption } from '@/types/prizePicks.ts';

interface PropListProps {
  onPropSelect?: (prop: ProcessedPrizePicksProp, option: PropOption) => void;
}

export const PropList: React.FC<PropListProps key={842983}> = ({ onPropSelect }) => {
  const [props, setProps] = useState<ProcessedPrizePicksProp[] key={978302}>([]);
  const [filter, setFilter] = useState<
    'all' | 'goblins' | 'demons' | 'value-bets' | 'high-confidence'
  >('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProps = () => {
      const filteredProps =
        filter === 'all'
          ? Array.from(prizePicksService.getFilteredProps('high-confidence'))
          : prizePicksService.getFilteredProps(filter);

      setProps(filteredProps);
      setLoading(false);
    };

    loadProps();
    const interval = setInterval(loadProps, 60000); // Refresh every minute;

    return () => clearInterval(interval);
  }, [filter]);

  const handlePropSelect = (prop: ProcessedPrizePicksProp, option: PropOption) => {
    onPropSelect?.(prop, option);
  };

  function mapToPrizePicksProjection(prop: ProcessedPrizePicksProp) {
    // Determine propType from winningProp or default to 'normal'

    return {
      id: prop.player_name + '_' + prop.stat_type + '_' + prop.game_time,
      playerId: prop.player_name,
      playerName: prop.player_name,
      teamAbbrev: prop.team_abbreviation,
      position: prop.position,
      statType: prop.stat_type,
      league: prop.sport,
      gameTime: prop.game_time,
      opponent: prop.opponent_team,
      projectedValue: prop.projected_value,
      lineScore: prop.line_value,
      confidence: prop.confidence_percentage,
      propType,
      fireCount: 0, // fallback, could be improved;
    };
  }

  return (
    <div className="space-y-4" key={160407}>
      {/* Filter Controls */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2" key={766859}>
        <button;
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() = key={190314}> setFilter('all')}
        >
          All Props;
        </button>
        <button;
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'goblins' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() = key={966813}> setFilter('goblins')}
        >
          Goblins;
        </button>
        <button;
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'demons' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() = key={64707}> setFilter('demons')}
        >
          Demons;
        </button>
        <button;
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'value-bets' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() = key={483895}> setFilter('value-bets')}
        >
          Value Bets;
        </button>
        <button;
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'high-confidence'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() = key={374807}> setFilter('high-confidence')}
        >
          High Confidence;
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8" key={792327}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" / key={891127}>
        </div>
      )}

      {/* Props Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={696568}>
        {props.map(prop => {

          return (
            <PropCard;
              key={projection.id}
              isSelected={false}
              projection={projection}
              onClick={() = key={806856}> handlePropSelect(prop, prop.winningProp)}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && props.length === 0 && (
        <div className="text-center py-8 text-gray-500" key={998723}>
          No props found for the selected filter.
        </div>
      )}
    </div>
  );
};
export default React.memo(PropList);

import React, { useState  } from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import EnhancedPropCard from '@/components/ui/EnhancedPropCard.ts';
import GlowButton from '@/components/ui/GlowButton.ts';
import Tooltip from '@/components/ui/Tooltip.ts';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material.ts';
import { LineupBuilderStrategy, LineupBuilderOutput } from '@/types/predictions.ts';
import { LineupLeg, Lineup } from '@/types/lineup.ts';
import { predictionService } from '@/services/predictionService.ts';
import { formatCurrency, formatPercentage } from '@/utils/formatters.ts';
import { usePredictionStore } from '@/store/predictionStore.ts';

const convertToLineup = (output: LineupBuilderOutput): Lineup => ({
  id: output.id,
  timestamp: output.timestamp,
  strategy: output.strategy,
  legs: output.legs.map(leg => ({
    propType: leg.propType,
    line: leg.line.toString(),
    odds: leg.odds,
  })),
  performance: {
    expectedValue: output.performance.expectedValue,
    winProbability: output.performance.winProbability,
    riskScore: output.performance.riskScore,
  },
});

const LineupBuilderPage: React.FC = () => {
  const {
    currentLineup,
    setCurrentLineup,
    savedLineups,
    addSavedLineup,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = usePredictionStore();

  const [strategy, setStrategy] = useState<LineupBuilderStrategy key={6036}>({
    id: 'default',
    name: 'Default Strategy',
    type: 'balanced',
    targetConfidence: 75,
    maxLegs: 5,
    minLegs: 2,
    maxSameTeam: 2,
    riskProfile: {
      maxVariance: 0.5,
      maxCorrelation: 0.3,
      minExpectedValue: 0.1,
    },
  });

  const handleStrategyTypeChange = (event: SelectChangeEvent) => {

    setStrategy(prev => ({
      ...prev,
      type,
      targetConfidence: type === 'goblin' ? 84 : type === 'demon' ? 65 : 75,
      riskProfile: {
        ...prev.riskProfile,
        maxVariance: type === 'goblin' ? 0.3 : type === 'demon' ? 0.7 : 0.5,
        minExpectedValue: type === 'goblin' ? 0.15 : type === 'demon' ? 0.05 : 0.1,
      },
    }));
  };

  const handleConfidenceChange = (_: Event, value: number | number[]) => {
    setStrategy(prev => ({
      ...prev,
      targetConfidence: value as number,
    }));
  };

  const handleLegsChange = (event: SelectChangeEvent) => {
    const [min, max] = (event.target.value as string).split('-').map(Number);
    setStrategy(prev => ({
      ...prev,
      minLegs: min,
      maxLegs: max,
    }));
  };

  const handleSameTeamChange = (event: SelectChangeEvent) => {
    setStrategy(prev => ({
      ...prev,
      maxSameTeam: Number(event.target.value),
    }));
  };

  const generateLineup = async () => {
    setIsLoading(true);
    setError(null);
    try {

      setCurrentLineup(convertToLineup(result));
    } catch (error) {
      // console statement removed
      setError('Failed to generate lineup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLineup = () => {
    if (currentLineup) {
      addSavedLineup(currentLineup);
    }
  };

  const handlePlaceLineup = () => {
    // Implement lineup placement logic;
    // console statement removed
  };

  return (
    <div className="p-6 space-y-8" key={641202}>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6" key={289465}>
        Lineup Builder;
      </h1>

      {error && (
        <GlassCard className="mb-3" key={447273}>
          <div className="text-red-600 font-semibold" key={411434}>{error}</div>
        </GlassCard>
      )}

      {/* Strategy Configuration */}
      <GlassCard className="mb-6" key={539144}>
        <Grid container spacing={3} key={459826}>
          <Grid item md={6} xs={12} key={967702}>
            <FormControl fullWidth key={113575}>
              <InputLabel key={405232}>Strategy Type</InputLabel>
              <Select;
                label="Strategy Type"
                value={strategy.type}
                onChange={handleStrategyTypeChange}
               key={182998}>
                <MenuItem value="goblin" key={30450}>Goblin (Conservative)</MenuItem>
                <MenuItem value="demon" key={231817}>Demon (Aggressive)</MenuItem>
                <MenuItem value="balanced" key={824384}>Balanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12} key={967702}>
            <Typography gutterBottom key={993228}>Target Confidence</Typography>
            <Slider;
              max={95}
              min={50}
              value={strategy.targetConfidence}
              valueLabelDisplay="auto"
              valueLabelFormat={value = key={945235}> `${value}%`}
              onChange={handleConfidenceChange}
            />
          </Grid>

          <Grid item md={6} xs={12} key={967702}>
            <FormControl fullWidth key={113575}>
              <InputLabel key={405232}>Number of Legs</InputLabel>
              <Select;
                label="Number of Legs"
                value={`${strategy.minLegs}-${strategy.maxLegs}`}
                onChange={handleLegsChange}
               key={757174}>
                <MenuItem value="2-3" key={425107}>2-3 Legs</MenuItem>
                <MenuItem value="3-4" key={681500}>3-4 Legs</MenuItem>
                <MenuItem value="4-5" key={831178}>4-5 Legs</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12} key={967702}>
            <FormControl fullWidth key={113575}>
              <InputLabel key={405232}>Max Same Team</InputLabel>
              <Select;
                label="Max Same Team"
                value={strategy.maxSameTeam.toString()}
                onChange={handleSameTeamChange}
               key={228201}>
                <MenuItem value="1" key={464279}>1 Player</MenuItem>
                <MenuItem value="2" key={243098}>2 Players</MenuItem>
                <MenuItem value="3" key={32148}>3 Players</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button;
          fullWidth;
          color="primary"
          disabled={isLoading}
          sx={{ mt: 3 }}
          variant="contained"
          onClick={generateLineup}
         key={16132}>
          Generate Lineup;
        </Button>
      </GlassCard>

      {/* Generated Lineup */}
      {isLoading ? (
        <div className="flex justify-center p-6" key={100972}>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" key={958411}></div>
        </div>
      ) : currentLineup ? (
        <GlassCard key={726196}>
          <div className="flex justify-between items-center mb-4" key={240336}>
            <h2 className="text-xl font-semibold" key={97699}>Generated Lineup</h2>
            <span;
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentLineup.performance.winProbability  key={182388}>= 80;
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {formatPercentage(currentLineup.performance.winProbability)} Win Probability;
            </span>
          </div>
          <div className="mb-2 text-gray-500" key={831360}>
            Expected Value: {formatCurrency(currentLineup.performance.expectedValue)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4" key={410348}>
            {currentLineup.legs.map((leg: LineupLeg, index: number) => (
              <EnhancedPropCard;
                key={index}
                playerName={leg.playerName || ''}
                team={leg.team || ''}
                position={leg.position || ''}
                statType={leg.propType}
                line={leg.line}
                overOdds={leg.odds}
                underOdds={leg.odds}
                pickType={leg.pickType}
                trendValue={leg.trendValue}
                gameInfo={leg.gameInfo}
                playerImageUrl={leg.playerImageUrl}
                onSelect={() = key={166183}> {}}
                onViewDetails={() => {}}
              />
            ))}
          </div>
          <div className="mt-6 flex gap-4" key={252466}>
            <GlowButton onClick={handlePlaceLineup} className="flex-1" key={221869}>
              Place Lineup;
            </GlowButton>
            <GlowButton onClick={handleSaveLineup} className="flex-1 bg-white text-primary-600 border border-primary-500" key={451010}>
              Save Lineup;
            </GlowButton>
          </div>
        </GlassCard>
      ) : null}

      {/* Saved Lineups */}
      {savedLineups.length > 0 && (
        <div className="mt-8" key={715068}>
          <h2 className="text-2xl font-bold mb-4" key={946196}>Saved Lineups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" key={583338}>
            {savedLineups.map((lineup: Lineup) => (
              <GlassCard key={lineup.id} key={13821}>
                <div className="flex justify-between items-center mb-2" key={88839}>
                  <span className="font-semibold" key={331625}>{lineup.strategy.name}</span>
                  <span;
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lineup.performance.winProbability  key={130989}>= 80;
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {formatPercentage(lineup.performance.winProbability)} Win Probability;
                  </span>
                </div>
                <div className="mb-2 text-gray-500" key={831360}>
                  Expected Value: {formatCurrency(lineup.performance.expectedValue)}
                </div>
                <div className="grid grid-cols-1 gap-2 mt-2" key={183382}>
                  {lineup.legs.map((leg: LineupLeg, index: number) => (
                    <EnhancedPropCard;
                      key={index}
                      playerName={leg.playerName || ''}
                      team={leg.team || ''}
                      position={leg.position || ''}
                      statType={leg.propType}
                      line={leg.line}
                      overOdds={leg.odds}
                      underOdds={leg.odds}
                      pickType={leg.pickType}
                      trendValue={leg.trendValue}
                      gameInfo={leg.gameInfo}
                      playerImageUrl={leg.playerImageUrl}
                      onSelect={() = key={750900}> {}}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
                <GlowButton onClick={() = key={666391}> setCurrentLineup(lineup)} className="w-full mt-4">
                  Load Lineup;
                </GlowButton>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LineupBuilderPage;

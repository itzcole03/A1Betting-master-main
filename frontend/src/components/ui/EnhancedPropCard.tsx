import React from 'react.ts';
import GlassCard from './GlassCard.ts';
import GlowButton from './GlowButton.ts';

export interface EnhancedPropCardProps {
  playerName: string;
  team: string;
  position: string;
  statType: string;
  line: number;
  overOdds: number;
  underOdds: number;
  sentiment?: string;
  aiBoost?: number;
  patternStrength?: number;
  bonusPercent?: number;
  enhancementPercent?: number;
  pickType?: 'demon' | 'goblin' | 'normal';
  trendValue?: number;
  gameInfo?: { opponent: string; day: string; time: string };
  playerImageUrl?: string;
  onSelect?: (pick: 'over' | 'under') => void;
  onViewDetails?: () => void;
  selected?: boolean;
  className?: string;
}

const badge = (label: string, value: string | number, color: string) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color} bg-opacity-10`} key={307181}>
    {label}: {value}
  </span>
);

export const EnhancedPropCard: React.FC<EnhancedPropCardProps key={953606}> = ({
  playerName,
  team,
  position,
  statType,
  line,
  overOdds,
  underOdds,
  sentiment,
  aiBoost,
  patternStrength,
  bonusPercent,
  enhancementPercent,
  pickType = 'normal',
  trendValue,
  gameInfo,
  playerImageUrl,
  onSelect,
  onViewDetails,
  selected = false,
  className = '',
}) => (
  <GlassCard className={`relative p-6 flex flex-col space-y-3 transition-all ${selected ? 'ring-4 ring-primary-500' : ''} ${className}`} key={405306}>
    {/* Top Row: Player Image, Trend, Special Icon */}
    <div className="flex items-center justify-between mb-2" key={120997}>
      <div className="flex items-center gap-2" key={100294}>
        {playerImageUrl && (
          <img src={playerImageUrl} alt={playerName} className="w-10 h-10 rounded-lg object-cover border border-gray-300" / key={710218}>
        )}
        <div className="text-xs text-gray-400" key={588004}>{team} - {position}</div>
      </div>
      {trendValue !== undefined && (
        <span className="text-xs text-white bg-gradient-to-r from-green-500 to-blue-500 px-2 py-1 rounded-full font-bold shadow" key={141110}>{trendValue}K</span>
      )}
      {(pickType === 'demon' || pickType === 'goblin') && (
        <img;
          src={pickType === 'demon' ? 'https://app.prizepicks.com/7534b2e82fa0ac08ec43.png' : 'https://app.prizepicks.com/e00b98475351cdfd1c38.png'}
          alt={pickType}
          className="w-7 h-7 ml-2"
        / key={136023}>
      )}
    </div>
    {/* Player Name and Game Info */}
    <div className="text-center" key={120206}>
      <div className="font-bold text-lg text-primary-600" key={555318}>{playerName}</div>
      {gameInfo && (
        <div className="text-xs text-gray-400" key={588004}>vs {gameInfo.opponent} {gameInfo.day} {gameInfo.time}</div>
      )}
    </div>
    {/* Stat Line */}
    <div className="flex items-center justify-center gap-2 mt-2" key={641702}>
      <span className="text-xl font-bold text-white" key={253375}>{line}</span>
      <span className="text-gray-400 text-sm" key={259309}>{statType}</span>
    </div>
    {/* Over/Under Buttons */}
    <div className="flex items-center justify-between space-x-2 mt-2" key={28895}>
      <GlowButton onClick={() = key={666391}> onSelect?.('over')} className={`flex-1 ${pickType === 'demon' ? 'bg-red-900/30 hover:bg-red-800/40 text-red-100' : pickType === 'goblin' ? 'bg-green-900/30 hover:bg-green-800/40 text-green-100' : ''}`}>Over <span className="ml-1 text-green-400" key={675039}>{overOdds > 0 ? `+${overOdds}` : overOdds}</span>{pickType === 'demon' && <span className="text-xs opacity-75 ml-1" key={809429}>1.25x</span>}{pickType === 'goblin' && <span className="text-xs opacity-75 ml-1" key={809429}>0.85x</span>}</GlowButton>
      <GlowButton onClick={() = key={666391}> onSelect?.('under')} className="flex-1">Under <span className="ml-1 text-blue-400" key={551472}>{underOdds > 0 ? `+${underOdds}` : underOdds}</span></GlowButton>
    </div>
    {/* Badges */}
    <div className="flex flex-wrap gap-2 mt-2" key={142801}>
      {aiBoost !== undefined && badge('AI Boost', `${aiBoost}%`, 'text-yellow-400')}
      {patternStrength !== undefined && badge('Pattern', `${patternStrength}%`, 'text-purple-400')}
      {bonusPercent !== undefined && badge('Bonus', `${bonusPercent}%`, 'text-green-400')}
      {enhancementPercent !== undefined && badge('Enhance', `${enhancementPercent}%`, 'text-blue-400')}
      {sentiment && badge('Sentiment', sentiment, 'text-pink-400')}
    </div>
    {/* View Details Button */}
    <button;
      onClick={onViewDetails}
      className="absolute top-2 right-2 text-xs text-gray-400 hover:text-primary-500 underline focus:outline-none"
      aria-label="Show prediction explanation"
     key={970039}>
      Why this prediction?
    </button>
  </GlassCard>
);

export default EnhancedPropCard;

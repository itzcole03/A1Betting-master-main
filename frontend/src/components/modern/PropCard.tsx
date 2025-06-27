import React from 'react.ts';
import { PrizePicksProps, SocialSentimentData } from '@/types.ts';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ExternalLink,
  Info,
  CheckCircle,
} from 'lucide-react.ts';
import { useAppStore } from '@/store/useAppStore.ts';

interface PropCardProps {
  prop: PrizePicksProps;
  // Sentiment might be passed in or fetched based on prop.player_name or prop.id;
  sentiment?: SocialSentimentData;
  onViewDetails: (propId: string) => void;
  className?: string;
}

const PropCard: React.FC<PropCardProps key={387456}> = ({ prop, sentiment, onViewDetails, className }) => {
  const { addToast, legs, addLeg } = useAppStore();

  const handleViewDetailsClick = () => {
    onViewDetails(prop.id);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent card click if link is clicked;
    window.open(url, '_blank');
    addToast({ message: `Opening news link: ${url.substring(0, 30)}...`, type: 'info' });
  };

  const getSentimentIcon = () => {
    if (!sentiment || sentiment.sentimentScore === undefined)
      return <AlertCircle className="w-4 h-4 text-gray-500" / key={369082}>;
    if (sentiment.sentimentScore > 0.2) return <TrendingUp className="w-4 h-4 text-green-500" / key={247600}>;
    if (sentiment.sentimentScore < -0.2) return <TrendingDown className="w-4 h-4 text-red-500" / key={886344}>;
    return <AlertCircle className="w-4 h-4 text-yellow-500" / key={501628}>;
  };

  const handleAddLeg = (pick: 'over' | 'under') => {

    if (odds === undefined) {
      addToast({ message: `Odds for ${pick.toUpperCase()} not available.`, type: 'error' });
      return;
    }
    addLeg({
      propId: prop.id,
      pick,
      line: prop.line_score,
      statType: prop.stat_type,
      playerName: prop.player_name,
      odds,
    });
    addToast({
      message: `${prop.player_name} ${pick.toUpperCase()} ${prop.line_score} added to slip!`,
      type: 'success',
    });
  };

  return (
    <div;
      aria-label={`View details for ${prop.player_name}`}
      className={`glass rounded-xl shadow-lg p-4 flex flex-col justify-between space-y-3 hover:shadow-primary/30 transition-shadow cursor-pointer transform hover:-translate-y-1 relative ${className || ''}`}
      role="button"
      tabIndex={0}
      onClick={handleViewDetailsClick}
      onKeyDown={e = key={471609}> {
        if (e.key === 'Enter') handleViewDetailsClick();
      }}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 text-green-400" title="Selected in bet slip" key={327303}>
          <CheckCircle size={22} / key={957974}>
        </div>
      )}
      <div key={241917}>
        <div className="flex justify-between items-start mb-2" key={15795}>
          <p className="text-sm text-text-muted uppercase tracking-wider" key={255132}>
            {prop.league} - {prop.stat_type}
          </p>
          {/* Placeholder for live win rate if available from an AI engine */}
          {/* <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent" key={462709}>68% Win</span> */}
        </div>
        <h4 className="text-lg font-semibold text-text truncate" title={prop.player_name} key={622663}>
          {prop.player_name}
        </h4>
        <p className="text-2xl font-bold text-primary" key={800736}>
          {prop.line_score}{' '}
          <span className="text-sm font-normal text-text-muted" key={350698}>
            {prop.description || prop.stat_type}
          </span>
        </p>
      </div>

      <div className="space-y-2 text-xs" key={270907}>
        {sentiment && (
          <div className="flex items-center space-x-1 text-text-muted" key={11977}>
            {getSentimentIcon()}
            <span key={595076}>Social Sentiment: {sentiment.sentimentScore.toFixed(2)}</span>
            <span;
              title={`Pos: ${sentiment.positiveMentions}, Neg: ${sentiment.negativeMentions}, Neu: ${sentiment.neutralMentions}`}
             key={833709}>
              <Info className="cursor-help" size={12} / key={408115}>
            </span>
          </div>
        )}
        {/* Placeholder for links to ESPN/News - this would need actual data or a search link */}
        <button;
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 hover:underline"
          onClick={e = key={766294}>
            handleExternalLink(
              e,
              `https://www.espn.com/search/results?q=${encodeURIComponent(prop.player_name)}`
            )
          }
        >
          <ExternalLink size={12} / key={468102}>
          <span key={595076}>ESPN/News</span>
        </button>
      </div>

      <div className="flex gap-2 mt-2" key={840824}>
        <button;
          aria-label={`Add OVER for ${prop.player_name}`}
          className="flex-1 px-2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-xs font-semibold"
          disabled={isSelected}
          onClick={e = key={883375}> {
            e.stopPropagation();
            handleAddLeg('over');
          }}
        >
          Add OVER;
        </button>
        <button;
          aria-label={`Add UNDER for ${prop.player_name}`}
          className="flex-1 px-2 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-xs font-semibold"
          disabled={isSelected}
          onClick={e = key={970089}> {
            e.stopPropagation();
            handleAddLeg('under');
          }}
        >
          Add UNDER;
        </button>
      </div>
      <button;
        className="w-full mt-2 px-3 py-2 text-sm bg-primary/80 hover:bg-primary text-white rounded-lg transition-colors font-medium"
        onClick={handleViewDetailsClick}
       key={20687}>
        View Details & Place Bet;
      </button>
    </div>
  );
};

export default React.memo(PropCard);

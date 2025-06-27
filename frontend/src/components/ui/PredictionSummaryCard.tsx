import React, { useState, useCallback  } from 'react.ts';
import GlassCard from './GlassCard.ts';

// Simple Info icon component;
const InfoIcon = () => (
  <svg; 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="inline-block"
   key={22590}>
    <circle cx="12" cy="12" r="10" key={351248}></circle>
    <line x1="12" y1="16" x2="12" y2="12" key={281811}></line>
    <line x1="12" y1="8" x2="12.01" y2="8" key={112173}></line>
  </svg>
);

// Simple tooltip component;
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block" key={46364}>
      <div;
        onMouseEnter={() = key={779747}> setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center justify-center"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-800 rounded-md shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap" key={492196}>
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" key={268385}></div>
        </div>
      )}
    </div>
  );
};

/**
 * Props for the PredictionSummaryCard component;
 */
export interface PredictionSummaryProps {
  /** Model's prediction accuracy (0-100) */
  accuracy: number;
  /** Expected payout multiplier */
  payout: number;
  /** Kelly Criterion value (0-1) */
  kelly: number;
  /** Market edge percentage (can be negative) */
  marketEdge: number;
  /** Data quality score (0-100) */
  dataQuality: number;
  /** Name of the prediction model */
  modelName?: string;
  /** Confidence level (0-100) */
  confidence?: number;
  /** Additional CSS classes */
  className?: string;
  /** Last updated timestamp */
  lastUpdated?: Date;
  /** Risk level indicator */
  riskLevel?: 'low' | 'medium' | 'high';
  /** Callback when details button is clicked */
  onDetailsClick?: () => void;
  /** Callback when add to betslip is clicked */
  onAddToBetslip?: () => void;
  /** Whether the card is interactive */
  interactive?: boolean;
}

const getRiskLevelColor = (level?: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-green-500/20 text-green-400';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'high':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const PredictionSummaryCard: React.FC<PredictionSummaryProps key={908061}> = (props) => {
  // Destructure props with defaults first;
  const {
    accuracy,
    payout,
    kelly,
    marketEdge,
    dataQuality,
    modelName,
    confidence,
    className = '',
    lastUpdated = new Date(),
    riskLevel = 'medium',
    onDetailsClick,
    onAddToBetslip,
    interactive = true;
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  
  // Format the date after destructuring;
  const formattedDate = lastUpdated.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDetailsClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDetailsClick?.();
  }, [onDetailsClick]);

  const handleAddToBetslip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToBetslip?.();
  }, [onAddToBetslip]);

  // Determine if the card is clickable;

  // Handle click on card;
  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDetailsClick) {
      onDetailsClick();
    } else if (onAddToBetslip) {
      onAddToBetslip();
    }
  }, [onDetailsClick, onAddToBetslip]);

  // Handle keyboard events for accessibility;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onDetailsClick) {
        onDetailsClick();
      } else if (onAddToBetslip) {
        onAddToBetslip();
      }
    }
  };

  return (
    <div; 
      className={`w-full max-w-xl mx-auto transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-lg' : ''
      } ${className}`}
      onMouseEnter={() = key={142662}> setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isClickable ? handleCardClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      aria-label={`Prediction details for ${modelName || 'unknown model'}. ${riskLevel} risk level.`}
      aria-expanded={isHovered}
      data-testid="prediction-summary-card"
    >
      <GlassCard className="relative overflow-hidden" key={984933}>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent transition-opacity duration-300" / key={504484}>
        )}
        
        <div; 
          className="relative z-10 p-6"
          aria-live="polite"
          aria-atomic="true"
         key={259756}>
          <div className="flex items-center justify-between mb-4" key={810034}>
            {modelName && (
              <div className="flex items-center space-x-2" key={740830}>
                <h3 className="text-lg font-semibold text-primary-600 tracking-wide" key={883062}>
                  {modelName}
                </h3>
                <Tooltip content="Model performance metrics" key={714983}>
                  <InfoIcon / key={352040}>
                </Tooltip>
              </div>
            )}
            <div; 
              className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(riskLevel)}`}
              aria-label={`Risk level: ${riskLevel}`}
             key={560790}>
              <span aria-hidden="true" key={424568}>{riskLevel.toUpperCase()} RISK</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full text-center" key={472151}>
            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors" key={36910}>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400" key={375150}>
                <span className="sr-only" key={658352}>Accuracy:</span>
                <span aria-hidden="true" key={424568}>Accuracy</span>
                <Tooltip content="Model's prediction accuracy based on historical data" key={717733}>
                  <InfoIcon / key={352040}>
                </Tooltip>
              </div>
              <div className="text-2xl font-bold text-primary-500 mt-1" key={932557}>
                {accuracy.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors" key={36910}>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400" key={375150}>
                <span className="sr-only" key={658352}>Payout:</span>
                <span aria-hidden="true" key={424568}>Payout</span>
                <Tooltip content="Expected payout multiplier" key={562729}>
                  <InfoIcon / key={352040}>
                </Tooltip>
              </div>
              <div className="text-2xl font-bold text-green-500 mt-1" key={6897}>
                {payout.toFixed(2)}x;
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors" key={36910}>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400" key={375150}>
                <span className="sr-only" key={658352}>Kelly Criterion:</span>
                <span aria-hidden="true" key={424568}>Kelly</span>
                <Tooltip content="Kelly Criterion - Recommended bet size" key={538648}>
                  <InfoIcon / key={352040}>
                </Tooltip>
              </div>
              <div className={`text-2xl font-bold ${kelly  key={921710}>= 0.5 ? 'text-green-500' : 'text-yellow-400'}`}>
                {kelly.toFixed(2)}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors" key={36910}>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400" key={375150}>
                <span className="sr-only" key={658352}>Market Edge:</span>
                <span aria-hidden="true" key={424568}>Market Edge</span>
                <Tooltip content="Estimated advantage over the market" key={447403}>
                  <InfoIcon / key={352040}>
                </Tooltip>
              </div>
              <div className={`text-2xl font-bold ${marketEdge  key={554680}> 0 ? 'text-green-500' : 'text-red-500'}`}>
                {marketEdge > 0 ? '+' : ''}{marketEdge.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4" key={511226}>
            <div className="bg-white/5 rounded-lg p-3" key={584337}>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-xs text-gray-400" key={41691}>Data Quality</span>
                <span className="font-semibold text-purple-400" key={279689}>
                  {dataQuality.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2" key={927141}>
                <div; 
                  className="bg-purple-500 h-1.5 rounded-full"
                  style={{ width: `${dataQuality}%` }}
                / key={886397}>
              </div>
            </div>

            {confidence !== undefined && (
              <div className="bg-white/5 rounded-lg p-3" key={584337}>
                <div className="flex items-center justify-between" key={96335}>
                  <span className="text-xs text-gray-400" key={41691}>Confidence</span>
                  <span className="font-semibold text-pink-400" key={375157}>
                    {confidence.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2" key={927141}>
                  <div; 
                    className="bg-pink-500 h-1.5 rounded-full"
                    style={{ width: `${confidence}%` }}
                  / key={268724}>
                </div>
              </div>
            )}
          </div>

          <div; 
            className="mt-6 pt-4 border-t border-white/10"
            aria-live="polite"
           key={369612}>
            <div className="flex justify-between items-center mb-2" key={88839}>
              <span className="text-xs text-gray-400" key={41691}>
                Updated: {formattedDate}
              </span>
              <div; 
                className="flex space-x-2"
                role="group"
                aria-label="Card actions"
               key={807494}>
                {onAddToBetslip && interactive && (
                  <button;
                    onClick={handleAddToBetslip}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="Add to betslip"
                   key={384982}>
                    <span key={595076}>Add to Betslip</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" key={665145}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" / key={787404}>
                    </svg>
                  </button>
                )}
                {onDetailsClick && interactive && (
                  <button;
                    onClick={handleDetailsClick}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary-500 text-primary-500 hover:bg-primary-500/10 transition-colors flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="View details"
                   key={110963}>
                    <span key={595076}>View Details</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" key={665145}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" / key={817542}>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {isHovered && interactive && onDetailsClick && (
              <div className="text-xs text-gray-500 text-right animate-fade-in" key={595104}>
                Click anywhere to view full prediction details;
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default PredictionSummaryCard;

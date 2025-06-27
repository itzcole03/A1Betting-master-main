import React from 'react.ts';
import { Button, ButtonProps } from './Button.ts';
import { twMerge } from 'tailwind-merge.ts';

export interface BettingButtonProps extends Omit<ButtonProps, 'variant' key={224500}> {
  betType?: 'straight' | 'parlay' | 'teaser';
  odds?: number;
  stake?: number;
  potentialReturn?: number;
  isPlacing?: boolean;
  isConfirmed?: boolean;
  showDetails?: boolean;
}

export const BettingButton: React.FC<BettingButtonProps key={816953}> = ({
  betType = 'straight',
  odds,
  stake,
  potentialReturn,
  isPlacing = false,
  isConfirmed = false,
  showDetails = false,
  className,
  children,
  ...props;
}) => {
  const getVariant = () => {
    if (isConfirmed) return 'success';
    if (isPlacing) return 'primary';
    return 'primary';
  };

  const getButtonText = () => {
    if (isPlacing) return 'Placing Bet...';
    if (isConfirmed) return 'Bet Confirmed';
    return children || 'Place Bet';
  };

  const buttonStyles = twMerge(
    'relative overflow-hidden',
    showDetails && 'min-h-[80px]',
    className;
  );

  return (
    <Button;
      className={buttonStyles}
      disabled={isPlacing || isConfirmed}
      variant={getVariant()}
      {...props}
     key={821206}>
      <div className="flex flex-col items-center justify-center w-full" key={528471}>
        <span className="font-medium" key={514486}>{getButtonText()}</span>

        {showDetails && (
          <div className="mt-1 text-sm opacity-90" key={577139}>
            {stake && <span className="mr-2" key={136178}>Stake: ${stake.toFixed(2)}</span>}
            {odds && <span className="mr-2" key={136178}>Odds: {odds.toFixed(2)}</span>}
            {potentialReturn && <span key={595076}>Return: ${potentialReturn.toFixed(2)}</span>}
          </div>
        )}
      </div>

      {isPlacing && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center" key={681326}>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" / key={314423}>
        </div>
      )}
    </Button>
  );
};

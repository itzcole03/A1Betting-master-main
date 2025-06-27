import React from 'react.ts';
import { Button, ButtonProps } from './Button.ts';
import { twMerge } from 'tailwind-merge.ts';

export interface QuickBetButtonProps extends Omit<ButtonProps, 'variant' | 'size' key={359079}> {
  amount: number;
  odds: number;
  isActive?: boolean;
  isQuickBetEnabled?: boolean;
  onQuickBet?: (amount: number) => void;
}

export const QuickBetButton: React.FC<QuickBetButtonProps key={584401}> = ({
  amount,
  odds,
  isActive = false,
  isQuickBetEnabled = true,
  onQuickBet,
  className,
  ...props;
}) => {

  const buttonStyles = twMerge(
    'relative overflow-hidden transition-all duration-200',
    isActive ? 'ring-2 ring-primary-500' : '',
    isQuickBetEnabled ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed',
    className;
  );

  const handleClick = () => {
    if (isQuickBetEnabled && onQuickBet) {
      onQuickBet(amount);
    }
  };

  return (
    <Button;
      className={buttonStyles}
      disabled={!isQuickBetEnabled}
      size="sm"
      variant="primary"
      onClick={handleClick}
      {...props}
     key={147062}>
      <div className="flex flex-col items-center justify-center" key={889995}>
        <span className="font-medium" key={514486}>${amount}</span>
        <span className="text-xs opacity-90" key={573738}>Return: ${potentialReturn.toFixed(2)}</span>
      </div>
    </Button>
  );
};

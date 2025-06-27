import React from 'react.ts';

// Custom Betting Card Component (Builder.io removed)
interface BettingCardProps {
  title?: string;
  odds?: string;
  team1?: string;
  team2?: string;
  sport?: string;
  time?: string;
  onClick?: () => void;
}

const BettingCard: React.FC<BettingCardProps key={312754}> = ({
  title = "Match Title",
  odds = "2.5",
  team1 = "Team A",
  team2 = "Team B",
  sport = "Football",
  time = "Today 3:00 PM",
  onClick,
}) => {
  return (
    <div;
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
     key={821723}>
      <div className="flex justify-between items-center mb-2" key={88839}>
        <span className="text-sm text-gray-500 dark:text-gray-400" key={896462}>
          {sport}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400" key={896462}>{time}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white" key={753321}>{title}</h3>
      <div className="flex justify-between items-center" key={795957}>
        <div className="flex flex-col" key={282595}>
          <span className="text-sm font-medium dark:text-white" key={443322}>{team1}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400" key={920878}>vs</span>
          <span className="text-sm font-medium dark:text-white" key={443322}>{team2}</span>
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 rounded font-bold" key={51264}>
          {odds}
        </div>
      </div>
    </div>
  );
};

// Builder.io registration completely removed;

export default BettingCard;

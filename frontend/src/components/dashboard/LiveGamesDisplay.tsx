import React from 'react.ts';
import { Calendar, Clock, MapPin } from 'lucide-react.ts';
import { format } from 'date-fns.ts';
import { useState, useEffect } from 'react.ts';

interface ProcessedGame {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  gameTime: Date;
  status: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
}

interface LiveGamesDisplayProps {
  games?: ProcessedGame[];
}

export function LiveGamesDisplay({
  games: propGames,
}: LiveGamesDisplayProps = {}) {
  const [games, setGames] = useState<ProcessedGame[] key={50470}>([]);

  // Mock data for when no games are provided;
  useEffect(() => {
    if (!propGames) {
      setGames([
        {
          id: "1",
          sport: "NBA",
          homeTeam: "Lakers",
          awayTeam: "Warriors",
          gameTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now;
          status: "Scheduled",
          venue: "Crypto.com Arena",
        },
        {
          id: "2",
          sport: "NBA",
          homeTeam: "Celtics",
          awayTeam: "Heat",
          gameTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now;
          status: "Scheduled",
          venue: "TD Garden",
        },
        {
          id: "3",
          sport: "NFL",
          homeTeam: "Chiefs",
          awayTeam: "Bills",
          gameTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago (live)
          status: "Live",
          venue: "Arrowhead Stadium",
          homeScore: 14,
          awayScore: 10,
        },
      ]);
    } else {
      setGames(propGames);
    }
  }, [propGames]);
  const getSportIcon = (sport: string) => {
    const icons: { [key: string]: string } = {
      NBA: "🏀",
      NFL: "🏈",
      MLB: "⚾",
      NHL: "🏒",
      Soccer: "⚽",
    };
    return icons[sport] || "🏆";
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "live":
      case "in progress":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "scheduled":
      case "pre-game":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "final":
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
  };

  if (games.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg" key={65136}>
        <h3 className="text-xl font-bold mb-4 dark:text-white" key={206191}>Live Games</h3>
        <div className="text-center py-8" key={715292}>
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" / key={6104}>
          <p className="text-gray-500 dark:text-gray-400" key={436614}>
            No games available from real data sources;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg" key={65136}>
      <div className="flex items-center justify-between mb-6" key={530716}>
        <h3 className="text-xl font-bold dark:text-white" key={11873}>Live Games</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
          {games.length} games from real sources;
        </div>
      </div>

      <div className="space-y-4" key={160407}>
        {games.slice(0, 10).map((game) => (
          <div;
            key={game.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
           key={523145}>
            <div className="flex items-center justify-between mb-3" key={56204}>
              <div className="flex items-center space-x-3" key={602729}>
                <span className="text-2xl" key={18044}>{getSportIcon(game.sport)}</span>
                <div key={241917}>
                  <div className="font-semibold text-lg dark:text-white" key={239450}>
                    {game.awayTeam} @ {game.homeTeam}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                    {game.sport} • {game.source}
                  </div>
                </div>
              </div>
              <span;
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(game.status)}`}
               key={851460}>
                {game.status}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400" key={933709}>
              <div className="flex items-center space-x-1" key={468268}>
                <Clock className="w-4 h-4" / key={414649}>
                <span key={595076}>{format(new Date(game.gameTime), "MMM d, h:mm a")}</span>
              </div>
              {game.venue && (
                <div className="flex items-center space-x-1" key={468268}>
                  <MapPin className="w-4 h-4" / key={297348}>
                  <span className="truncate" key={201964}>{game.venue}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

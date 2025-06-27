import React, { useState  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { Users, Star, DollarSign, TrendingUp, Target, Zap } from 'lucide-react.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card.ts';
import { Badge } from '@/ui/badge.ts';

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  salary: number;
  projectedPoints: number;
  ownership: number;
  value: number;
  tier: "elite" | "core" | "value" | "punt";
}

export const SmartLineupBuilder: React.FC = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[] key={702301}>([]);
  const [remainingSalary, setRemainingSalary] = useState(50000);
  const [lineup] = useState({
    projectedTotal: 0,
    ownership: 0,
    ceiling: 0,
    floor: 0,
  });

  const [availablePlayers] = useState<Player[] key={702301}>([
    {
      id: "1",
      name: "LeBron James",
      position: "SF",
      team: "LAL",
      salary: 11200,
      projectedPoints: 52.4,
      ownership: 25.3,
      value: 4.68,
      tier: "elite",
    },
    {
      id: "2",
      name: "Steph Curry",
      position: "PG",
      team: "GSW",
      salary: 10800,
      projectedPoints: 48.7,
      value: 4.51,
      ownership: 22.1,
      tier: "elite",
    },
    {
      id: "3",
      name: "Nikola Jokic",
      position: "C",
      team: "DEN",
      salary: 12000,
      projectedPoints: 55.2,
      ownership: 18.9,
      value: 4.6,
      tier: "elite",
    },
    {
      id: "4",
      name: "Tyler Herro",
      position: "SG",
      team: "MIA",
      salary: 7400,
      projectedPoints: 32.8,
      ownership: 12.5,
      value: 4.43,
      tier: "core",
    },
    {
      id: "5",
      name: "Draymond Green",
      position: "PF",
      team: "GSW",
      salary: 5200,
      projectedPoints: 28.1,
      ownership: 8.7,
      value: 5.4,
      tier: "value",
    },
  ]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "elite":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "core":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "value":
        return "bg-green-100 text-green-800 border-green-200";
      case "punt":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const addPlayer = (player: Player) => {
    if (selectedPlayers.length < 8 && remainingSalary >= player.salary) {
      setSelectedPlayers([...selectedPlayers, player]);
      setRemainingSalary(remainingSalary - player.salary);
    }
  };

  const removePlayer = (playerId: string) => {

    if (player) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId));
      setRemainingSalary(remainingSalary + player.salary);
    }
  };

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
          📋 Smart Lineup Builder;
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
          AI-powered daily fantasy lineup optimization with advanced analytics;
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" key={793741}>
        {/* Lineup Construction */}
        <div className="lg:col-span-2 space-y-6" key={381409}>
          {/* Current Lineup */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <Users className="w-5 h-5 text-blue-500" / key={28315}>
                Current Lineup ({selectedPlayers.length}/8)
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              {selectedPlayers.length === 0 ? (
                <div className="text-center py-8 text-gray-500" key={998723}>
                  No players selected. Start building your lineup!
                </div>
              ) : (
                <div className="space-y-3" key={186520}>
                  {selectedPlayers.map((player) => (
                    <div;
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                     key={104885}>
                      <div className="flex items-center gap-3" key={443099}>
                        <Badge variant="secondary" key={147627}>{player.position}</Badge>
                        <div key={241917}>
                          <div className="font-medium" key={471146}>{player.name}</div>
                          <div className="text-sm text-gray-500" key={826371}>
                            {player.team}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4" key={782146}>
                        <div className="text-right" key={144468}>
                          <div className="font-medium" key={471146}>
                            ${player.salary.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500" key={826371}>
                            {player.projectedPoints} pts;
                          </div>
                        </div>
                        <button;
                          onClick={() = key={670278}> removePlayer(player.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Players */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <Star className="w-5 h-5 text-yellow-500" / key={760994}>
                Available Players;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="space-y-3" key={186520}>
                {availablePlayers.map((player) => (
                  <div;
                    key={player.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() = key={688606}> addPlayer(player)}
                  >
                    <div className="flex items-center gap-3" key={443099}>
                      <Badge variant="outline" key={93734}>{player.position}</Badge>
                      <div key={241917}>
                        <div className="font-medium" key={471146}>{player.name}</div>
                        <div className="text-sm text-gray-500" key={826371}>
                          {player.team}
                        </div>
                      </div>
                      <Badge className={getTierColor(player.tier)} key={863223}>
                        {player.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4" key={782146}>
                      <div className="text-right" key={144468}>
                        <div className="font-medium" key={471146}>
                          ${player.salary.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500" key={826371}>
                          {player.projectedPoints} pts;
                        </div>
                      </div>
                      <div className="text-right" key={144468}>
                        <div className="text-sm font-medium text-green-600" key={169783}>
                          {player.value}x;
                        </div>
                        <div className="text-sm text-gray-500" key={826371}>
                          {player.ownership}% own;
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lineup Analysis */}
        <div className="space-y-6" key={501869}>
          {/* Salary Information */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <DollarSign className="w-5 h-5 text-green-500" / key={926676}>
                Salary Cap;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="space-y-4" key={160407}>
                <div key={241917}>
                  <div className="flex justify-between mb-2" key={99106}>
                    <span className="text-sm text-gray-600" key={279234}>Used</span>
                    <span className="text-sm font-medium" key={318054}>
                      ${(50000 - remainingSalary).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2" key={205936}>
                    <div;
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${((50000 - remainingSalary) / 50000) * 100}%`,
                      }}
                     key={751771}></div>
                  </div>
                </div>
                <div className="text-center" key={120206}>
                  <div className="text-lg font-bold text-green-600" key={134873}>
                    ${remainingSalary.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500" key={826371}>Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lineup Projections */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <TrendingUp className="w-5 h-5 text-purple-500" / key={312580}>
                Projections;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="space-y-4" key={160407}>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-600" key={588716}>Projected Total</span>
                  <span className="font-bold" key={369632}>
                    {selectedPlayers;
                      .reduce((sum, p) => sum + p.projectedPoints, 0)
                      .toFixed(1)}{" "}
                    pts;
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-600" key={588716}>Avg Ownership</span>
                  <span className="font-bold" key={369632}>
                    {selectedPlayers.length > 0;
                      ? (
                          selectedPlayers.reduce(
                            (sum, p) => sum + p.ownership,
                            0,
                          ) / selectedPlayers.length;
                        ).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-600" key={588716}>Lineup Value</span>
                  <span className="font-bold text-green-600" key={391195}>
                    {selectedPlayers.length > 0;
                      ? (
                          selectedPlayers.reduce((sum, p) => sum + p.value, 0) /
                          selectedPlayers.length;
                        ).toFixed(2)
                      : 0}
                    x;
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optimization Tools */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <Zap className="w-5 h-5 text-orange-500" / key={856273}>
                AI Tools;
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3" key={445386}>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all" key={600257}>
                Generate Optimal Lineup;
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all" key={251824}>
                Optimize Current;
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all" key={251824}>
                Generate Contrarian;
              </button>
              <button className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-all" key={744081}>
                Export Lineup;
              </button>
            </CardContent>
          </Card>

          {/* Lineup Rating */}
          <Card className="glass-card" key={851506}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center gap-2" key={587456}>
                <Target className="w-5 h-5 text-red-500" / key={825954}>
                Lineup Rating;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="text-center" key={120206}>
                <div className="text-3xl font-bold text-purple-600 mb-2" key={545184}>
                  {selectedPlayers.length > 0 ? "87" : "--"}
                </div>
                <div className="text-sm text-gray-500 mb-4" key={607339}>Overall Score</div>
                <div className="space-y-2" key={725977}>
                  <div className="flex justify-between text-sm" key={353204}>
                    <span key={595076}>Value</span>
                    <span className="text-green-600" key={209818}>A+</span>
                  </div>
                  <div className="flex justify-between text-sm" key={353204}>
                    <span key={595076}>Ceiling</span>
                    <span className="text-blue-600" key={489125}>A-</span>
                  </div>
                  <div className="flex justify-between text-sm" key={353204}>
                    <span key={595076}>Ownership</span>
                    <span className="text-orange-600" key={893512}>B+</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

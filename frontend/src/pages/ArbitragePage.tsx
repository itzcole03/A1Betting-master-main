import React, { useState, useEffect  } from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import GlowButton from '@/components/ui/GlowButton.ts';

interface ArbitrageOpportunity {
  id: string;
  sport: string;
  event: string;
  market: string;
  bookmaker1: {
    name: string;
    odds: number;
    stake: number;
  };
  bookmaker2: {
    name: string;
    odds: number;
    stake: number;
  };
  profit: number;
  profitPercentage: number;
  expiresAt: string;
}

const fetchOpportunities = async (): Promise<ArbitrageOpportunity[] key={128378}> => {
  // Replace with real API call;

  if (!res.ok) throw new Error("Failed to fetch arbitrage opportunities");
  return res.json();
};

const ArbitragePage: React.FC = () => {
  const [minProfit, setMinProfit] = useState<number key={430559}>(10);
  const [selectedSports, setSelectedSports] = useState<string[] key={530032}>([
    "NBA",
    "NFL",
    "MLB",
    "WNBA",
    "Soccer",
    "PGA",
    "Tennis",
    "Esports",
    "MMA",
  ]);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[] key={128378}>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchOpportunities()
      .then((data) => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load data");
        setLoading(false);
      });
  }, []);

  const filteredOpportunities = opportunities.filter(
    (opp) => opp.profit >= minProfit && selectedSports.includes(opp.sport),
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950" key={212813}>
      <GlassCard className="mb-8" key={170857}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8" key={204340}>
          <h1 className="text-2xl lg:text-3xl font-bold" key={809535}>
            🔄 Arbitrage Finder;
          </h1>
          <div className="flex flex-wrap gap-4" key={214638}>
            {/* Min Profit Filter */}
            <div className="flex items-center space-x-2" key={740830}>
              <label className="text-sm font-medium" key={860547}>Min Profit $</label>
              <input;
                className="modern-input w-24"
                min="0"
                step="5"
                type="number"
                value={minProfit}
                onChange={(e) = key={900476}> setMinProfit(Number(e.target.value))}
              />
            </div>
            {/* Sport Filters */}
            <div className="flex flex-wrap gap-2 rounded-lg" key={850577}>
              {[
                "NBA",
                "NFL",
                "MLB",
                "WNBA",
                "Soccer",
                "PGA",
                "Tennis",
                "Esports",
                "MMA",
              ].map((sport) => (
                <button;
                  key={sport}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    selectedSports.includes(sport)
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() = key={773224}>
                    setSelectedSports((prev) =>
                      prev.includes(sport)
                        ? prev.filter((s) => s !== sport)
                        : [...prev, sport],
                    )
                  }
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4" key={160407}>
          {loading ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400" key={877061}>
              Loading...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 dark:text-red-400" key={258343}>
              {error}
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400" key={877061}>
              No arbitrage opportunities available.
            </div>
          ) : (
            filteredOpportunities.map((opp) => (
              <GlassCard;
                key={opp.id}
                className="p-6 hover:shadow-lg transition-shadow"
               key={20088}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" key={272681}>
                  <div key={241917}>
                    <h3 className="text-lg font-bold" key={818660}>{opp.event}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400" key={198314}>
                      {opp.sport} • {opp.market}
                    </p>
                  </div>
                  <div className="flex items-center gap-8" key={609870}>
                    <div className="text-center" key={120206}>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400" key={458250}>
                        Profit;
                      </p>
                      <p className="text-lg font-bold text-green-600" key={477957}>
                        ${opp.profit.toFixed(2)}
                      </p>
                      <p className="text-xs text-green-600" key={709710}>
                        ({opp.profitPercentage.toFixed(2)}%)
                      </p>
                    </div>
                    <div className="text-center" key={120206}>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400" key={458250}>
                        Expires;
                      </p>
                      <p className="text-sm" key={364551}>
                        {new Date(opp.expiresAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4" key={412605}>
                  <GlassCard className="p-4" key={456254}>
                    <div className="flex justify-between items-center mb-2" key={88839}>
                      <span className="font-medium" key={514486}>{opp.bookmaker1.name}</span>
                      <span className="text-lg font-bold" key={921959}>
                        {opp.bookmaker1.odds}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                      Stake: ${opp.bookmaker1.stake.toFixed(2)}
                    </div>
                  </GlassCard>
                  <GlassCard className="p-4" key={456254}>
                    <div className="flex justify-between items-center mb-2" key={88839}>
                      <span className="font-medium" key={514486}>{opp.bookmaker2.name}</span>
                      <span className="text-lg font-bold" key={921959}>
                        {opp.bookmaker2.odds}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                      Stake: ${opp.bookmaker2.stake.toFixed(2)}
                    </div>
                  </GlassCard>
                </div>
                <div className="mt-4 flex justify-end" key={406918}>
                  <GlowButton key={274977}>Place Bets</GlowButton>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default ArbitragePage;

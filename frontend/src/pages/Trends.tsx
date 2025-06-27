import React, { useState  } from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import GlowButton from '@/components/ui/GlowButton.ts';
import Tooltip from '@/components/ui/Tooltip.ts';
import { analyticsService } from '@/services/analytics.ts';
import { ErrorMessage } from '@/components/common/ErrorMessage.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';

const timeRanges = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: '365', label: 'Last year' },
];

const Trends: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useQuery({
    queryKey: ['performance', selectedTimeRange],
    queryFn: () => analyticsService.getPerformanceTrends(selectedTimeRange),
  });
  const { data: sportsData, isLoading: sportsLoading, error: sportsError } = useQuery({
    queryKey: ['sports', selectedSport, selectedTimeRange],
    queryFn: () => analyticsService.getSportsDistribution(selectedSport, selectedTimeRange),
  });
  const { data: marketsData, isLoading: marketsLoading, error: marketsError } = useQuery({
    queryKey: ['markets', selectedMarket, selectedTimeRange],
    queryFn: () => analyticsService.getMarketsDistribution(selectedMarket, selectedTimeRange),
  });

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement key={836532}>) => {
    setSelectedSport(event.target.value);
  };
  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement key={836532}>) => {
    setSelectedMarket(event.target.value);
  };
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement key={836532}>) => {
    setSelectedTimeRange(event.target.value);
  };

  if (performanceError || sportsError || marketsError) {
    return <ErrorMessage error={performanceError || sportsError || marketsError} / key={347999}>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-100 to-blue-50 dark:from-gray-900 dark:to-blue-950" key={617347}>
      <GlassCard className="mb-8" key={170857}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6" key={449042}>
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100" key={928224}>Trends</h1>
          <select className="modern-input" value={selectedTimeRange} onChange={handleTimeRangeChange} key={812689}>
            {timeRanges.map(range => (
              <option key={range.value} value={range.value} key={949547}>{range.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" key={637382}>
          <GlassCard key={726196}>
            <h2 className="text-lg font-semibold mb-2" key={316855}>Performance Trends</h2>
            {performanceLoading ? (
              <div className="flex justify-center items-center h-64" key={951011}><span key={595076}>Loading...</span></div>
            ) : (
              <div className="h-64" key={118048}>
                <ResponsiveContainer height="100%" width="100%" key={191291}>
                  <LineChart data={performanceData} key={149537}>
                    <CartesianGrid strokeDasharray="3 3" / key={580708}>
                    <XAxis dataKey="timestamp" / key={223901}>
                    <YAxis / key={190086}>
                    <RechartsTooltip / key={2217}>
                    <Legend / key={913243}>
                    <Line dataKey="value" stroke="#8884d8" strokeWidth={2} type="monotone" / key={150772}>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
          <GlassCard key={726196}>
            <h2 className="text-lg font-semibold mb-2" key={316855}>Sports Distribution</h2>
            <select className="modern-input mb-2" value={selectedSport} onChange={handleSportChange} key={127450}>
              <option value="all" key={673287}>All Sports</option>
              <option value="football" key={465014}>Football</option>
              <option value="basketball" key={32898}>Basketball</option>
              <option value="tennis" key={282490}>Tennis</option>
            </select>
            {sportsLoading ? (
              <div className="flex justify-center items-center h-64" key={951011}><span key={595076}>Loading...</span></div>
            ) : (
              <div className="h-64" key={118048}>
                <ResponsiveContainer height="100%" width="100%" key={191291}>
                  <BarChart data={sportsData} key={878580}>
                    <CartesianGrid strokeDasharray="3 3" / key={580708}>
                    <XAxis dataKey="name" / key={113992}>
                    <YAxis / key={190086}>
                    <RechartsTooltip / key={2217}>
                    <Legend / key={913243}>
                    <Bar dataKey="value" fill="#82ca9d" / key={335527}>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
          <GlassCard key={726196}>
            <h2 className="text-lg font-semibold mb-2" key={316855}>Market Distribution</h2>
            <select className="modern-input mb-2" value={selectedMarket} onChange={handleMarketChange} key={63350}>
              <option value="all" key={673287}>All Markets</option>
              <option value="match-winner" key={280301}>Match Winner</option>
              <option value="over-under" key={586159}>Over/Under</option>
              <option value="btts" key={101871}>Both Teams to Score</option>
            </select>
            {marketsLoading ? (
              <div className="flex justify-center items-center h-64" key={951011}><span key={595076}>Loading...</span></div>
            ) : (
              <div className="h-64" key={118048}>
                <ResponsiveContainer height="100%" width="100%" key={191291}>
                  <BarChart data={marketsData} key={585942}>
                    <CartesianGrid strokeDasharray="3 3" / key={580708}>
                    <XAxis dataKey="name" / key={113992}>
                    <YAxis / key={190086}>
                    <RechartsTooltip / key={2217}>
                    <Legend / key={913243}>
                    <Bar dataKey="value" fill="#8884d8" / key={519476}>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </GlassCard>
        </div>
        <GlassCard key={726196}>
          <h2 className="text-lg font-semibold mb-4" key={488981}>Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
            <div className="flex items-center gap-3" key={443099}>
              <TrendingUpIcon className="text-green-500" / key={658512}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Most Profitable Sport</div>
                <div key={241917}>Football</div>
              </div>
            </div>
            <div className="flex items-center gap-3" key={443099}>
              <TrendingDownIcon className="text-red-500" / key={211990}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Least Profitable Market</div>
                <div key={241917}>Handicap</div>
              </div>
            </div>
            <div className="flex items-center gap-3" key={443099}>
              <TrendingUpIcon className="text-green-500" / key={658512}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Best Time to Bet</div>
                <div key={241917}>Weekend Matches</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </GlassCard>
    </div>
  );
};

export default Trends;

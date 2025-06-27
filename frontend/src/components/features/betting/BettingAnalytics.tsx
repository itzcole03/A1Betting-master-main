import { AnimatePresence, motion } from 'framer-motion.ts';
import React, { useCallback, useMemo, useState  } from 'react.ts';
import { useBettingAnalytics } from '@/../hooks/useBettingAnalytics.ts';
import { useSmartAlerts } from '@/../hooks/useSmartAlerts.ts';
import { BettingOpportunity } from '@/../services/bettingStrategy.ts';
import { Alert } from '@/base/Alert.ts';
import { Badge } from '@/base/Badge.ts';
import { Card } from '@/base/Card.ts';
import { Progress } from '@/base/Progress.ts';
import { Skeleton } from '@/base/Skeleton.ts';
import { Table } from '@/base/Table.ts';

interface BettingAnalyticsProps {
  onOpportunitySelect?: (opportunity: BettingOpportunity) => void;
}

interface PredictionFactor {
  name: string;
  impact: number;
  description: string;
}

export const BettingAnalytics: React.FC<BettingAnalyticsProps key={232088}> = ({
  onOpportunitySelect,
}) => {
  const [selectedSport, setSelectedSport] = useState<string key={278855}>("all");
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [sortField, setSortField] = useState<string key={278855}>("confidence");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { opportunities, predictions, performance, isLoading, error } =
    useBettingAnalytics({
      minConfidence: confidenceThreshold,
      autoRefresh: true,
      refreshInterval: 30000,
    });

  const { alerts } = useSmartAlerts({
    wsEndpoint: import.meta.env.VITE_WS_ENDPOINT || "",
    enabledTypes: ["LINE_MOVEMENT", "INJURY", "WEATHER"],
    minSeverity: "medium",
  });

  const filteredOpportunities = useMemo(() => {
    return opportunities;
      .filter((opp) => selectedSport === "all" || opp.sport === selectedSport)
      .sort((a, b) => {


        return sortDirection === "asc"
          ? aValue > bValue;
            ? 1;
            : -1;
          : bValue > aValue;
            ? 1;
            : -1;
      });
  }, [opportunities, selectedSport, sortField, sortDirection]);

  const handleOpportunityClick = useCallback(
    (opportunity: BettingOpportunity) => {
      onOpportunitySelect?.(opportunity);
    },
    [onOpportunitySelect],
  );

  const renderPerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" key={158598}>
      <Card key={650115}>
        <div className="p-4" key={916123}>
          <h3 className="text-sm font-medium text-gray-500" key={48312}>Win Rate</h3>
          <div className="mt-2 flex items-center" key={569672}>
            <span className="text-2xl font-semibold" key={840773}>
              {(performance.winRate * 100).toFixed(1)}%
            </span>
            <Badge;
              variant={performance.winRate  key={682314}>= 0.55 ? "success" : "warning"}
              className="ml-2"
            >
              {performance.winRate >= 0.55 ? "Profitable" : "Monitor"}
            </Badge>
          </div>
          <Progress;
            value={performance.winRate * 100}
            max={100}
            variant={performance.winRate  key={440422}>= 0.55 ? "success" : "warning"}
            className="mt-2"
          />
        </div>
      </Card>

      <Card key={650115}>
        <div className="p-4" key={916123}>
          <h3 className="text-sm font-medium text-gray-500" key={48312}>ROI</h3>
          <div className="mt-2 flex items-center" key={569672}>
            <span className="text-2xl font-semibold" key={840773}>
              {(performance.roi * 100).toFixed(1)}%
            </span>
            <Badge;
              variant={performance.roi  key={326555}> 0 ? "success" : "danger"}
              className="ml-2"
            >
              {performance.roi > 0 ? "Positive" : "Negative"}
            </Badge>
          </div>
          <Progress;
            value={Math.min(Math.max(performance.roi * 100, 0), 100)}
            max={100}
            variant={performance.roi  key={210166}> 0 ? "success" : "danger"}
            className="mt-2"
          />
        </div>
      </Card>

      <Card key={650115}>
        <div className="p-4" key={916123}>
          <h3 className="text-sm font-medium text-gray-500" key={48312}>Edge Retention</h3>
          <div className="mt-2 flex items-center" key={569672}>
            <span className="text-2xl font-semibold" key={840773}>
              {(performance.edgeRetention * 100).toFixed(1)}%
            </span>
            <Badge;
              variant={performance.edgeRetention  key={941894}>= 0.7 ? "success" : "warning"}
              className="ml-2"
            >
              {performance.edgeRetention >= 0.7 ? "Strong" : "Weak"}
            </Badge>
          </div>
          <Progress;
            value={performance.edgeRetention * 100}
            max={100}
            variant={performance.edgeRetention  key={883139}>= 0.7 ? "success" : "warning"}
            className="mt-2"
          />
        </div>
      </Card>
    </div>
  );

  if (error) {
    return (
      <Alert;
        type="error"
        title="Error Loading Analytics"
        message={error.message}
      / key={465628}>
    );
  }

  return (
    <div className="space-y-6" key={501869}>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" key={158598}>
          <Skeleton className="h-32" / key={719063}>
          <Skeleton className="h-32" / key={719063}>
          <Skeleton className="h-32" / key={719063}>
        </div>
      ) : (
        renderPerformanceMetrics()
      )}

      <Card key={650115}>
        <div className="p-4" key={916123}>
          <div className="flex justify-between items-center mb-4" key={240336}>
            <h2 className="text-lg font-semibold" key={180906}>Betting Opportunities</h2>
            <div className="flex space-x-2" key={753076}>
              <select;
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedSport}
                onChange={(e) = key={861797}> setSelectedSport(e.target.value)}
              >
                <option value="all" key={673287}>All Sports</option>
                <option value="NBA" key={172467}>NBA</option>
                <option value="NFL" key={613230}>NFL</option>
                <option value="MLB" key={328030}>MLB</option>
                <option value="NHL" key={500575}>NHL</option>
              </select>
              <select;
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={confidenceThreshold}
                onChange={(e) = key={250476}> setConfidenceThreshold(Number(e.target.value))}
              >
                <option value={0.6} key={913699}>60%+ Confidence</option>
                <option value={0.7} key={244497}>70%+ Confidence</option>
                <option value={0.8} key={407359}>80%+ Confidence</option>
                <option value={0.9} key={336879}>90%+ Confidence</option>
              </select>
            </div>
          </div>

          <AnimatePresence key={359944}>
            {alerts.length > 0 && (
              <motion.div;
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
               key={373022}>
                <Alert;
                  type="warning"
                  title="Active Alerts"
                  message={`${alerts.length} alert${alerts.length === 1 ? "" : "s"} require your attention`}
                / key={995808}>
              </motion.div>
            )}
          </AnimatePresence>

          <Table;
            data={filteredOpportunities}
            columns={[
              {
                key: "sport",
                title: "Sport",
                render: (value) = key={13753}> <Badge variant="default" key={826106}>{value}</Badge>,
              },
              {
                key: "description",
                title: "Opportunity",
                render: (value, item) => (
                  <div className="flex items-center" key={520222}>
                    <span key={595076}>{value}</span>
                    {alerts.some(
                      (alert) => alert.metadata.gameId === item.gameId,
                    ) && (
                        <Badge variant="warning" className="ml-2" key={86894}>
                          Alert;
                        </Badge>
                      )}
                  </div>
                ),
              },
              {
                key: "confidence",
                title: "Confidence",
                render: (value) => (
                  <div className="w-32" key={832799}>
                    <Progress;
                      value={value * 100}
                      max={100}
                      variant={value  key={739870}>= 0.8 ? "success" : "warning"}
                      showValue;
                      size="sm"
                    />
                  </div>
                ),
              },
              {
                key: "expectedValue",
                title: "Expected Value",
                render: (value) => (
                  <span;
                    className={value  key={266464}> 0 ? "text-green-600" : "text-red-600"}
                  >
                    {value > 0 ? "+" : ""}
                    {(value * 100).toFixed(1)}%
                  </span>
                ),
              },
            ]}
            onRowClick={handleOpportunityClick}
            emptyMessage="No opportunities match your criteria"
            sortKey={sortField}
            sortDirection={sortDirection}
            onSort={(key) => {
              if (key === sortField) {
                setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
              } else {
                setSortField(key);
                setSortDirection("desc");
              }
            }}
          />
        </div>
      </Card>
    </div>
  );
};

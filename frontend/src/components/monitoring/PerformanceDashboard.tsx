import React, { useEffect, useState  } from 'react.ts';
import SafeChart from '@/ui/SafeChart.ts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { performanceService } from '@/services/performanceService.ts';
import { toast } from 'react-toastify.ts';

// Register ChartJS components;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

interface PerformanceAlert {
  metric_name: string;
  threshold: number;
  current_value: number;
  timestamp: string;
  severity: "warning" | "critical";
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[] key={435241}>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[] key={676733}>([]);
  const [selectedMetric, setSelectedMetric] = useState<string key={278855}>("response_time");
  const [timeRange, setTimeRange] = useState<string key={278855}>("1h");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch performance metrics;

        setMetrics(metricsData);

        // Fetch alerts;


        setAlerts(alertsData);

        // Show toast for new critical alerts;
        alertsData;
          .filter((alert: PerformanceAlert) => alert.severity === "critical")
          .forEach((alert: PerformanceAlert) => {
            toast.error(
              `Critical alert: ${alert.metric_name} exceeded threshold (${alert.current_value} > ${alert.threshold})`,
            );
          });
      } catch (error) {
        // console statement removed
        toast.error("Failed to fetch performance data");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute;

    return () => clearInterval(interval);
  }, [selectedMetric, timeRange]);

  const chartData = {
    labels: metrics.map((m) => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: selectedMetric,
        data: metrics.map((m) => m.value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedMetric} over time`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6" key={935494}>
      <div className="mb-6" key={677855}>
        <h1 className="text-2xl font-bold mb-4" key={150076}>Performance Monitoring</h1>

        {/* Controls */}
        <div className="flex gap-4 mb-6" key={814279}>
          <select;
            className="p-2 border rounded"
            value={selectedMetric}
            onChange={(e) = key={998856}> setSelectedMetric(e.target.value)}
          >
            <option value="response_time" key={979093}>Response Time</option>
            <option value="error_rate" key={983540}>Error Rate</option>
            <option value="cpu_usage" key={835490}>CPU Usage</option>
            <option value="memory_usage" key={480836}>Memory Usage</option>
          </select>

          <select;
            className="p-2 border rounded"
            value={timeRange}
            onChange={(e) = key={929299}> setTimeRange(e.target.value)}
          >
            <option value="1h" key={238642}>Last Hour</option>
            <option value="6h" key={667836}>Last 6 Hours</option>
            <option value="24h" key={494390}>Last 24 Hours</option>
            <option value="7d" key={507453}>Last 7 Days</option>
          </select>
        </div>

        {/* Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6" key={564035}>
          <SafeChart;
            type="line"
            data={chartData}
            options={chartOptions}
            loadingMessage="Loading performance dashboard..."
          / key={850320}>
        </div>

        {/* Alerts */}
        <div className="bg-white p-4 rounded-lg shadow" key={641554}>
          <h2 className="text-xl font-semibold mb-4" key={626401}>Active Alerts</h2>
          {alerts.length === 0 ? (
            <p className="text-gray-500" key={992645}>No active alerts</p>
          ) : (
            <div className="space-y-4" key={160407}>
              {alerts.map((alert, index) => (
                <div;
                  key={index}
                  className={`p-4 rounded ${
                    alert.severity === "critical"
                      ? "bg-red-100 border-red-500"
                      : "bg-yellow-100 border-yellow-500"
                  } border`}
                 key={176225}>
                  <div className="flex justify-between items-center" key={795957}>
                    <div key={241917}>
                      <h3 className="font-semibold" key={204068}>{alert.metric_name}</h3>
                      <p className="text-sm text-gray-600" key={656535}>
                        Current: {alert.current_value.toFixed(2)} | Threshold:{" "}
                        {alert.threshold.toFixed(2)}
                      </p>
                    </div>
                    <span;
                      className={`px-2 py-1 rounded text-sm ${
                        alert.severity === "critical"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                     key={88486}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2" key={101703}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PerformanceDashboard);

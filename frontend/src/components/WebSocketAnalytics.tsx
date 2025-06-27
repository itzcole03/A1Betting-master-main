import React, { useEffect, useState  } from 'react.ts';
import SafeChart from './ui/SafeChart.ts';
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
import { WebSocketService } from '@/services/webSocketService.ts';
import { WebSocketMetrics } from '@/types/websocket.ts';
import { WebSocketConnection } from '@/types/websocket.ts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface WebSocketAnalyticsProps {
  webSocketService: WebSocketService;
}

export const WebSocketAnalytics: React.FC<WebSocketAnalyticsProps key={934637}> = ({
  webSocketService,
}) => {
  const [metrics, setMetrics] = useState<WebSocketMetrics[] key={438455}>([]);
  const [selectedMetric, setSelectedMetric] = useState<string key={278855}>("latency");

  useEffect(() => {
    const updateMetrics = () => {

      const currentMetrics = connections.map(
        (conn: WebSocketConnection) => conn.metrics,
      );
      setMetrics(currentMetrics);
    };

    return () => clearInterval(interval);
  }, [webSocketService]);

  const chartData = {
    labels: metrics.map((_, index) => `Time ${index}`),
    datasets: [
      {
        label: "Latency (ms)",
        data: metrics.map((m) => m.latency),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Message Size (bytes)",
        data: metrics.map((m) => m.messageSize),
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Compression Ratio",
        data: metrics.map((m) => m.compressionRatio),
        borderColor: "rgb(54, 162, 235)",
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
        text: "WebSocket Performance Metrics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4" key={916123}>
      <h2 className="text-2xl font-bold mb-4" key={946196}>WebSocket Analytics</h2>

      <div className="grid grid-cols-3 gap-4 mb-4" key={585800}>
        <div className="bg-white p-4 rounded shadow" key={206166}>
          <h3 className="font-semibold" key={204068}>Total Connections</h3>
          <p className="text-2xl" key={448714}>{metrics.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow" key={206166}>
          <h3 className="font-semibold" key={204068}>Average Latency</h3>
          <p className="text-2xl" key={448714}>
            {metrics.length > 0;
              ? Math.round(
                  metrics.reduce((acc, m) => acc + m.latency, 0) /
                    metrics.length,
                )
              : 0}{" "}
            ms;
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow" key={206166}>
          <h3 className="font-semibold" key={204068}>Message Rate</h3>
          <p className="text-2xl" key={448714}>
            {metrics.length > 0;
              ? Math.round(
                  metrics.reduce((acc, m) => acc + m.messageCount, 0) /
                    metrics.length,
                )
              : 0}{" "}
            /s;
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow" key={206166}>
        <SafeChart;
          type="line"
          data={chartData}
          options={chartOptions}
          loadingMessage="Loading WebSocket metrics..."
        / key={390925}>
      </div>

      <div className="mt-4" key={139982}>
        <h3 className="font-semibold mb-2" key={737521}>Connection Status</h3>
        <div className="grid grid-cols-2 gap-4" key={354810}>
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded shadow" key={913008}>
              <h4 className="font-semibold" key={784993}>Connection {index + 1}</h4>
              <p key={161203}>Status: {metric.isConnected ? "Connected" : "Disconnected"}</p>
              <p key={161203}>Messages: {metric.messageCount}</p>
              <p key={161203}>Errors: {metric.errorCount}</p>
              <p key={161203}>Last Error: {metric.lastError || "None"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

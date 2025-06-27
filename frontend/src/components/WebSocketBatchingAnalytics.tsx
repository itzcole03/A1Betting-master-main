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
import { webSocketBatching } from '@/services/WebSocketBatching.ts';
import { EventBus } from '@/unified/EventBus.ts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface BatchMetrics {
  totalBatches: number;
  totalMessages: number;
  averageBatchSize: number;
  compressionRatio: number;
  lastBatchTime: number;
}

export const WebSocketBatchingAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<BatchMetrics key={813397}>({
    totalBatches: 0,
    totalMessages: 0,
    averageBatchSize: 0,
    compressionRatio: 1,
    lastBatchTime: 0,
  });

  const [batchSizes, setBatchSizes] = useState<number[] key={753439}>([]);
  const [compressionRatios, setCompressionRatios] = useState<number[] key={753439}>([]);
  const [timestamps, setTimestamps] = useState<number[] key={753439}>([]);

  useEffect(() => {
    const updateMetrics = () => {

      setMetrics(currentMetrics);
    };

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBatchSent = (event: {
      batchSize: number;
      compressionRatio: number;
      timestamp: number;
    }) => {
      setBatchSizes((prev) => [...prev.slice(-20), event.batchSize]);
      setCompressionRatios((prev) => [
        ...prev.slice(-20),
        event.compressionRatio,
      ]);
      setTimestamps((prev) => [...prev.slice(-20), event.timestamp]);
    };

    eventBus.subscribe("websocket:batch:sent", handleBatchSent);

    return () => {
      eventBus.unsubscribe("websocket:batch:sent", handleBatchSent);
    };
  }, []);

  const chartData = {
    labels: timestamps.map((t) => new Date(t).toLocaleTimeString()),
    datasets: [
      {
        label: "Batch Size",
        data: batchSizes,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Compression Ratio",
        data: compressionRatios,
        borderColor: "rgb(255, 99, 132)",
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
        text: "WebSocket Batching Metrics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow" key={603773}>
      <h2 className="text-2xl font-bold mb-4" key={946196}>WebSocket Batching Analytics</h2>

      <div className="grid grid-cols-2 gap-4 mb-6" key={938054}>
        <div className="p-4 bg-gray-50 rounded" key={426536}>
          <h3 className="text-lg font-semibold mb-2" key={82841}>Total Metrics</h3>
          <div className="space-y-2" key={725977}>
            <p key={161203}>Total Batches: {metrics.totalBatches}</p>
            <p key={161203}>Total Messages: {metrics.totalMessages}</p>
            <p key={161203}>Average Batch Size: {metrics.averageBatchSize.toFixed(2)}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded" key={426536}>
          <h3 className="text-lg font-semibold mb-2" key={82841}>Performance Metrics</h3>
          <div className="space-y-2" key={725977}>
            <p key={161203}>Compression Ratio: {metrics.compressionRatio.toFixed(2)}x</p>
            <p key={161203}>
              Last Batch Time:{" "}
              {new Date(metrics.lastBatchTime).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <div className="h-64" key={118048}>
        <SafeChart;
          type="line"
          data={chartData}
          options={chartOptions}
          loadingMessage="Loading batching metrics..."
        / key={310547}>
      </div>
    </div>
  );
};

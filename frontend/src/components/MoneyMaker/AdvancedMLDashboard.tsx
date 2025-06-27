import React, { useState  } from 'react.ts';
import SafeChart from '@/ui/SafeChart.ts';
import { AdvancedMLDashboardPanels } from './AdvancedMLDashboardPanels.ts';

interface ModelStatus {
  id: string;
  name: string;
  status: "active" | "training" | "error";
  confidence: number;
  lastUpdate: string;
}

interface ModelPerformanceHistory {
  date: string;
  accuracy: number;
  f1: number;
}

interface AdvancedMLDashboardProps {
  models: ModelStatus[];
}

const mockPerformanceHistory: ModelPerformanceHistory[] = [
  { date: "2025-06-01", accuracy: 0.89, f1: 0.85 },
  { date: "2025-06-02", accuracy: 0.91, f1: 0.88 },
  { date: "2025-06-03", accuracy: 0.93, f1: 0.9 },
  { date: "2025-06-04", accuracy: 0.92, f1: 0.89 },
  { date: "2025-06-05", accuracy: 0.94, f1: 0.91 },
];

export const AdvancedMLDashboard: React.FC<AdvancedMLDashboardProps key={571907}> = ({
  models,
}) => {
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.id || "");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
  const eventId = "event-123"; // Replace with real event ID as needed;



  const chartData = {
    labels: models.map((m) => m.name),
    datasets: [
      {
        label: "Model Confidence",
        data: models.map((m) => m.confidence),
        backgroundColor: models.map((m) =>
          m.status === "active"
            ? "rgba(16, 185, 129, 0.5)"
            : m.status === "training"
              ? "rgba(245, 158, 11, 0.5)"
              : "rgba(239, 68, 68, 0.5)",
        ),
        borderColor: models.map((m) =>
          m.status === "active"
            ? "rgb(16, 185, 129)"
            : m.status === "training"
              ? "rgb(245, 158, 11)"
              : "rgb(239, 68, 68)",
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="advanced-ml-dashboard" key={266203}>
      <h2 className="text-2xl font-bold mb-4" key={946196}>ML Model Status</h2>
      <div className="flex gap-4 mb-4" key={777866}>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Model</label>
          <select;
            value={selectedModelId}
            onChange={(e) = key={289217}> setSelectedModelId(e.target.value)}
            className="rounded border px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id} key={555348}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div key={241917}>
          <label className="block text-sm font-medium mb-1" key={200751}>Time Range</label>
          <select;
            value={timeRange}
            onChange={(e) = key={197393}>
              setTimeRange(e.target.value as "7d" | "30d" | "90d")
            }
            className="rounded border px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="7d" key={507453}>Last 7 Days</option>
            <option value="30d" key={946037}>Last 30 Days</option>
            <option value="90d" key={153542}>Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6" key={345605}>
        <div className="glass-premium p-4 rounded-xl" key={178448}>
          <div className="text-sm text-gray-500" key={826371}>Active Models</div>
          <div className="text-2xl font-bold text-success-500" key={477526}>
            {activeModels.length}
          </div>
        </div>
        <div className="glass-premium p-4 rounded-xl" key={178448}>
          <div className="text-sm text-gray-500" key={826371}>Training</div>
          <div className="text-2xl font-bold text-warning-500" key={476694}>
            {trainingModels.length}
          </div>
        </div>
        <div className="glass-premium p-4 rounded-xl" key={178448}>
          <div className="text-sm text-gray-500" key={826371}>Errors</div>
          <div className="text-2xl font-bold text-error-500" key={175172}>
            {errorModels.length}
          </div>
        </div>
      </div>

      <div className="glass-premium p-4 rounded-xl mb-6" key={319752}>
        <h3 className="text-lg font-semibold mb-2" key={82841}>
          Model Confidence Distribution;
        </h3>
        <div className="h-64" key={118048}>
          <SafeChart;
            type="bar"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 1,
                },
              },
            }}
            loadingMessage="Loading model confidence data..."
          / key={144306}>
        </div>
      </div>

      <AdvancedMLDashboardPanels;
        eventId={eventId}
        modelId={selectedModelId}
        modelPerformanceHistory={mockPerformanceHistory}
      / key={673626}>
    </div>
  );
};

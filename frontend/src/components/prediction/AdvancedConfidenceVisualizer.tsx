import React, { useState, useEffect, useCallback, useMemo  } from 'react.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.ts';
import { Button } from '@/components/ui/button.ts';
import { Badge } from '@/components/ui/badge.ts';
import { Progress } from '@/components/ui/progress.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.ts';
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Gauge,
  Zap,
  Brain,
  Eye,
  Settings,
} from 'lucide-react.ts';
import SafeChart from '@/ui/SafeChart.ts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface PredictionWithConfidence {
  prediction_id: string;
  final_prediction: number;
  confidence_score: number;
  uncertainty_bounds: [number, number];
  model_agreement: number;
  quantum_fidelity: number;
  prediction_interval: [number, number];
  individual_predictions: Record<string, number key={817366}>;
  model_weights: Record<string, number key={817366}>;
  feature_importance: Record<string, number key={817366}>;
  shap_values: Record<string, number key={817366}>;
  processing_time: number;
  timestamp: string;
  context: {
    sport: string;
    event_type: string;
    market_type: string;
  };
}

interface ConfidenceMetrics {
  overall_confidence: number;
  directional_confidence: number;
  magnitude_confidence: number;
  model_consensus: number;
  uncertainty_quality: number;
  calibration_score: number;
  prediction_sharpness: number;
  coverage_probability: number;
}

interface ConfidenceDistribution {
  confidence_bins: number[];
  frequency: number[];
  accuracy_by_bin: number[];
}

export const AdvancedConfidenceVisualizer: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionWithConfidence[] key={23669}>(
    [],
  );
  const [confidenceMetrics, setConfidenceMetrics] =
    useState<ConfidenceMetrics | null key={664625}>(null);
  const [confidenceDistribution, setConfidenceDistribution] =
    useState<ConfidenceDistribution | null key={974591}>(null);
  const [selectedPrediction, setSelectedPrediction] =
    useState<PredictionWithConfidence | null key={79686}>(null);
  const [timeRange, setTimeRange] = useState("1h");
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.8);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch prediction data with confidence metrics;
  const fetchPredictionData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [predictionsRes, metricsRes, distributionRes] = await Promise.all([
        fetch(`/api/v3/predictions/with-confidence?timeRange=${timeRange}`),
        fetch("/api/v3/predictions/confidence-metrics"),
        fetch("/api/v3/predictions/confidence-distribution"),
      ]);

      if (predictionsRes.ok) {

        setPredictions(predictionsData);
      }

      if (metricsRes.ok) {

        setConfidenceMetrics(metricsData);
      }

      if (distributionRes.ok) {

        setConfidenceDistribution(distributionData);
      }
    } catch (error) {
      // console statement removed
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchPredictionData();
    const interval = setInterval(fetchPredictionData, 30000); // Update every 30 seconds;
    return () => clearInterval(interval);
  }, [fetchPredictionData]);

  // Get confidence level styling;
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.95)
      return {
        level: "EXCEPTIONAL",
        color: "text-purple-600",
        bg: "bg-purple-100",
        border: "border-purple-200",
      };
    if (confidence >= 0.9)
      return {
        level: "EXCELLENT",
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
      };
    if (confidence >= 0.8)
      return {
        level: "HIGH",
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200",
      };
    if (confidence >= 0.7)
      return {
        level: "GOOD",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        border: "border-yellow-200",
      };
    if (confidence >= 0.6)
      return {
        level: "MODERATE",
        color: "text-orange-600",
        bg: "bg-orange-100",
        border: "border-orange-200",
      };
    return {
      level: "LOW",
      color: "text-red-600",
      bg: "bg-red-100",
      border: "border-red-200",
    };
  };

  // High confidence predictions;
  const highConfidencePredictions = useMemo(() => {
    return predictions.filter((p) => p.confidence_score >= confidenceThreshold);
  }, [predictions, confidenceThreshold]);

  // Confidence trend chart data;
  const confidenceTrendData = useMemo(() => {
    if (!predictions.length) return null;

    const sortedPredictions = [...predictions].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    );

    return {
      labels: sortedPredictions.map((p) =>
        new Date(p.timestamp).toLocaleTimeString(),
      ),
      datasets: [
        {
          label: "Confidence Score",
          data: sortedPredictions.map((p) => p.confidence_score * 100),
          borderColor: "rgb(99, 102, 241)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.1,
          fill: true,
        },
        {
          label: "Model Agreement",
          data: sortedPredictions.map((p) => p.model_agreement * 100),
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          tension: 0.1,
          fill: false,
        },
        {
          label: "Quantum Fidelity",
          data: sortedPredictions.map((p) => p.quantum_fidelity * 100),
          borderColor: "rgb(168, 85, 247)",
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          tension: 0.1,
          fill: false,
        },
      ],
    };
  }, [predictions]);

  // Confidence distribution chart;
  const confidenceDistributionData = useMemo(() => {
    if (!confidenceDistribution) return null;

    return {
      labels: confidenceDistribution.confidence_bins.map(
        (bin) => `${(bin * 100).toFixed(0)}%`,
      ),
      datasets: [
        {
          label: "Frequency",
          data: confidenceDistribution.frequency,
          backgroundColor: "rgba(99, 102, 241, 0.6)",
          yAxisID: "y",
        },
        {
          label: "Accuracy",
          data: confidenceDistribution.accuracy_by_bin.map((acc) => acc * 100),
          type: "line" as const,
          borderColor: "rgb(34, 197, 94)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          yAxisID: "y1",
        },
      ],
    };
  }, [confidenceDistribution]);

  // Uncertainty visualization data;
  const uncertaintyScatterData = useMemo(() => {
    if (!predictions.length) return null;

    return {
      datasets: [
        {
          label: "High Confidence",
          data: predictions;
            .filter((p) => p.confidence_score >= 0.8)
            .map((p) => ({
              x: p.confidence_score * 100,
              y: (p.uncertainty_bounds[1] - p.uncertainty_bounds[0]) * 100,
            })),
          backgroundColor: "rgba(34, 197, 94, 0.7)",
          pointRadius: 6,
        },
        {
          label: "Medium Confidence",
          data: predictions;
            .filter(
              (p) => p.confidence_score >= 0.6 && p.confidence_score < 0.8,
            )
            .map((p) => ({
              x: p.confidence_score * 100,
              y: (p.uncertainty_bounds[1] - p.uncertainty_bounds[0]) * 100,
            })),
          backgroundColor: "rgba(251, 191, 36, 0.7)",
          pointRadius: 6,
        },
        {
          label: "Low Confidence",
          data: predictions;
            .filter((p) => p.confidence_score < 0.6)
            .map((p) => ({
              x: p.confidence_score * 100,
              y: (p.uncertainty_bounds[1] - p.uncertainty_bounds[0]) * 100,
            })),
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          pointRadius: 6,
        },
      ],
    };
  }, [predictions]);

  // Model contribution radar chart;
  const modelContributionData = useMemo(() => {
    if (!selectedPrediction?.model_weights) return null;


    return {
      labels: models.map((name) => name.replace("_", " ").toUpperCase()),
      datasets: [
        {
          label: "Model Weights",
          data: weights.map((w) => w * 100),
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderColor: "rgba(99, 102, 241, 1)",
          pointBackgroundColor: "rgba(99, 102, 241, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(99, 102, 241, 1)",
        },
      ],
    };
  }, [selectedPrediction]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96" key={797634}>
        <div className="text-center" key={120206}>
          <Brain className="w-8 h-8 animate-pulse mx-auto mb-4 text-gray-400" / key={528679}>
          <p className="text-gray-500" key={992645}>Loading confidence analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" key={80798}>
      {/* Header */}
      <div className="flex items-center justify-between" key={96335}>
        <div key={241917}>
          <h1 className="text-3xl font-bold text-gray-900" key={314869}>
            Advanced Confidence Analysis;
          </h1>
          <p className="text-gray-600 mt-1" key={187387}>
            Real-time prediction confidence and uncertainty visualization;
          </p>
        </div>
        <div className="flex gap-3" key={13535}>
          <Button onClick={fetchPredictionData} variant="outline" key={482895}>
            <Eye className="w-4 h-4 mr-2" / key={634971}>
            Refresh;
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      {confidenceMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" key={481236}>
          <Card className="border-l-4 border-l-blue-500" key={510169}>
            <CardHeader className="pb-2" key={21346}>
              <CardTitle className="text-sm font-medium text-gray-600" key={89430}>
                Overall Confidence;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="text-2xl font-bold text-gray-900" key={584455}>
                {(confidenceMetrics.overall_confidence * 100).toFixed(1)}%
              </div>
              <Progress;
                value={confidenceMetrics.overall_confidence * 100}
                className="mt-2"
              / key={659283}>
              <p className="text-xs text-gray-500 mt-1" key={68770}>
                Average prediction confidence;
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500" key={766926}>
            <CardHeader className="pb-2" key={21346}>
              <CardTitle className="text-sm font-medium text-gray-600" key={89430}>
                Model Consensus;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="text-2xl font-bold text-gray-900" key={584455}>
                {(confidenceMetrics.model_consensus * 100).toFixed(1)}%
              </div>
              <Progress;
                value={confidenceMetrics.model_consensus * 100}
                className="mt-2"
              / key={852076}>
              <p className="text-xs text-gray-500 mt-1" key={68770}>
                Inter-model agreement;
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500" key={284497}>
            <CardHeader className="pb-2" key={21346}>
              <CardTitle className="text-sm font-medium text-gray-600" key={89430}>
                Calibration Score;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="text-2xl font-bold text-gray-900" key={584455}>
                {(confidenceMetrics.calibration_score * 100).toFixed(1)}%
              </div>
              <Progress;
                value={confidenceMetrics.calibration_score * 100}
                className="mt-2"
              / key={959072}>
              <p className="text-xs text-gray-500 mt-1" key={68770}>
                Confidence calibration quality;
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500" key={363372}>
            <CardHeader className="pb-2" key={21346}>
              <CardTitle className="text-sm font-medium text-gray-600" key={89430}>
                Coverage Probability;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              <div className="text-2xl font-bold text-gray-900" key={584455}>
                {(confidenceMetrics.coverage_probability * 100).toFixed(1)}%
              </div>
              <Progress;
                value={confidenceMetrics.coverage_probability * 100}
                className="mt-2"
              / key={282771}>
              <p className="text-xs text-gray-500 mt-1" key={68770}>
                Prediction interval accuracy;
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="w-full" key={221555}>
        <TabsList className="grid w-full grid-cols-5" key={73711}>
          <TabsTrigger value="trends" key={139054}>Confidence Trends</TabsTrigger>
          <TabsTrigger value="distribution" key={607089}>Distribution</TabsTrigger>
          <TabsTrigger value="uncertainty" key={33165}>Uncertainty</TabsTrigger>
          <TabsTrigger value="predictions" key={91472}>High Confidence</TabsTrigger>
          <TabsTrigger value="analysis" key={89597}>Detailed Analysis</TabsTrigger>
        </TabsList>

        {/* Confidence Trends */}
        <TabsContent value="trends" key={594427}>
          <Card key={650115}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center" key={762707}>
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" / key={329707}>
                Real-time Confidence Trends;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              {confidenceTrendData && (
                <div className="h-80" key={286132}>
                  <SafeChart;
                    type="line"
                    data={confidenceTrendData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        tooltip: {
                          mode: "index",
                          intersect: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            callback: function (value) {
                              return value + "%";
                            },
                          },
                        },
                      },
                      interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false,
                      },
                    }}
                  / key={307501}>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Confidence Distribution */}
        <TabsContent value="distribution" key={317193}>
          <Card key={650115}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center" key={762707}>
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" / key={894818}>
                Confidence Distribution & Calibration;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              {confidenceDistributionData && (
                <div className="h-80" key={286132}>
                  <Bar;
                    data={confidenceDistributionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                      },
                      scales: {
                        y: {
                          type: "linear",
                          display: true,
                          position: "left",
                          title: {
                            display: true,
                            text: "Frequency",
                          },
                        },
                        y1: {
                          type: "linear",
                          display: true,
                          position: "right",
                          title: {
                            display: true,
                            text: "Accuracy (%)",
                          },
                          grid: {
                            drawOnChartArea: false,
                          },
                          ticks: {
                            callback: function (value) {
                              return value + "%";
                            },
                          },
                        },
                      },
                    }}
                  / key={570431}>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Uncertainty Analysis */}
        <TabsContent value="uncertainty" key={96852}>
          <Card key={650115}>
            <CardHeader key={236869}>
              <CardTitle className="flex items-center" key={762707}>
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" / key={637784}>
                Confidence vs Uncertainty;
              </CardTitle>
            </CardHeader>
            <CardContent key={452065}>
              {uncertaintyScatterData && (
                <div className="h-80" key={286132}>
                  <Scatter;
                    data={uncertaintyScatterData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `Confidence: ${context.parsed.x.toFixed(1)}%, Uncertainty: ${context.parsed.y.toFixed(1)}%`;
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: "Confidence Score (%)",
                          },
                          min: 0,
                          max: 100,
                        },
                        y: {
                          title: {
                            display: true,
                            text: "Uncertainty Range (%)",
                          },
                          min: 0,
                        },
                      },
                    }}
                  / key={775629}>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* High Confidence Predictions */}
        <TabsContent value="predictions" key={570693}>
          <div className="space-y-4" key={160407}>
            <div className="flex items-center justify-between" key={96335}>
              <h3 className="text-lg font-semibold" key={304656}>
                High Confidence Predictions;
              </h3>
              <div className="flex items-center gap-2" key={100294}>
                <span className="text-sm text-gray-600" key={279234}>Threshold:</span>
                <select;
                  value={confidenceThreshold}
                  onChange={(e) = key={225214}>
                    setConfidenceThreshold(Number(e.target.value))
                  }
                  className="px-3 py-1 border rounded"
                >
                  <option value={0.95} key={478431}>95%</option>
                  <option value={0.9} key={336879}>90%</option>
                  <option value={0.85} key={880418}>85%</option>
                  <option value={0.8} key={407359}>80%</option>
                  <option value={0.75} key={741636}>75%</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4" key={449070}>
              {highConfidencePredictions.map((prediction) => {
                const confidenceLevel = getConfidenceLevel(
                  prediction.confidence_score,
                );
                return (
                  <Card;
                    key={prediction.prediction_id}
                    className={`${confidenceLevel.border} ${confidenceLevel.bg} cursor-pointer hover:shadow-md transition-all`}
                    onClick={() = key={844107}> setSelectedPrediction(prediction)}
                  >
                    <CardContent className="p-4" key={706827}>
                      <div className="flex items-center justify-between mb-3" key={56204}>
                        <div className="flex items-center gap-3" key={443099}>
                          <Badge;
                            className={`${confidenceLevel.color} ${confidenceLevel.bg}`}
                           key={291412}>
                            {confidenceLevel.level}
                          </Badge>
                          <span className="font-medium" key={514486}>
                            {prediction.context.sport} -{" "}
                            {prediction.context.event_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2" key={100294}>
                          <Clock className="w-4 h-4 text-gray-400" / key={652081}>
                          <span className="text-sm text-gray-500" key={346858}>
                            {new Date(
                              prediction.timestamp,
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" key={426410}>
                        <div key={241917}>
                          <p className="text-sm text-gray-600" key={656535}>Prediction</p>
                          <p className="text-lg font-bold text-gray-900" key={241254}>
                            {prediction.final_prediction.toFixed(2)}
                          </p>
                        </div>
                        <div key={241917}>
                          <p className="text-sm text-gray-600" key={656535}>Confidence</p>
                          <p className="text-lg font-bold text-gray-900" key={241254}>
                            {(prediction.confidence_score * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div key={241917}>
                          <p className="text-sm text-gray-600" key={656535}>
                            Model Agreement;
                          </p>
                          <p className="text-lg font-bold text-gray-900" key={241254}>
                            {(prediction.model_agreement * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div key={241917}>
                          <p className="text-sm text-gray-600" key={656535}>
                            Uncertainty Range;
                          </p>
                          <p className="text-lg font-bold text-gray-900" key={241254}>
                            [{prediction.uncertainty_bounds[0].toFixed(2)},{" "}
                            {prediction.uncertainty_bounds[1].toFixed(2)}]
                          </p>
                        </div>
                      </div>

                      <div className="mt-3" key={661115}>
                        <Progress;
                          value={prediction.confidence_score * 100}
                          className="h-2"
                        / key={721982}>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* Detailed Analysis */}
        <TabsContent value="analysis" key={202358}>
          {selectedPrediction ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
              {/* Model Contribution Radar */}
              <Card key={650115}>
                <CardHeader key={236869}>
                  <CardTitle className="flex items-center" key={762707}>
                    <Gauge className="w-5 h-5 mr-2 text-purple-600" / key={570770}>
                    Model Contributions;
                  </CardTitle>
                </CardHeader>
                <CardContent key={452065}>
                  {modelContributionData && (
                    <div className="h-64" key={118048}>
                      <Radar;
                        data={modelContributionData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "top" as const,
                            },
                          },
                          scales: {
                            r: {
                              beginAtZero: true,
                              max: 100,
                              ticks: {
                                callback: function (value) {
                                  return value + "%";
                                },
                              },
                            },
                          },
                        }}
                      / key={605541}>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Prediction Details */}
              <Card key={650115}>
                <CardHeader key={236869}>
                  <CardTitle className="flex items-center" key={762707}>
                    <Target className="w-5 h-5 mr-2 text-green-600" / key={902291}>
                    Prediction Details;
                  </CardTitle>
                </CardHeader>
                <CardContent key={452065}>
                  <div className="space-y-4" key={160407}>
                    <div className="grid grid-cols-2 gap-4" key={354810}>
                      <div key={241917}>
                        <p className="text-sm font-medium text-gray-600" key={275140}>
                          Final Prediction;
                        </p>
                        <p className="text-xl font-bold text-gray-900" key={299883}>
                          {selectedPrediction.final_prediction.toFixed(3)}
                        </p>
                      </div>
                      <div key={241917}>
                        <p className="text-sm font-medium text-gray-600" key={275140}>
                          Quantum Fidelity;
                        </p>
                        <p className="text-xl font-bold text-purple-600" key={229589}>
                          {(selectedPrediction.quantum_fidelity * 100).toFixed(
                            1,
                          )}
                          %
                        </p>
                      </div>
                    </div>

                    <div key={241917}>
                      <p className="text-sm font-medium text-gray-600 mb-2" key={560334}>
                        Prediction Interval;
                      </p>
                      <div className="bg-gray-100 p-3 rounded-lg" key={668779}>
                        <p className="text-center font-mono" key={869241}>
                          [
                          {selectedPrediction.prediction_interval[0].toFixed(3)}
                          ,{" "}
                          {selectedPrediction.prediction_interval[1].toFixed(3)}
                          ]
                        </p>
                      </div>
                    </div>

                    <div key={241917}>
                      <p className="text-sm font-medium text-gray-600 mb-2" key={560334}>
                        Processing Time;
                      </p>
                      <p className="text-lg font-semibold text-gray-900" key={933787}>
                        {(selectedPrediction.processing_time * 1000).toFixed(1)}
                        ms;
                      </p>
                    </div>

                    <div key={241917}>
                      <p className="text-sm font-medium text-gray-600 mb-2" key={560334}>
                        Context;
                      </p>
                      <div className="space-y-1" key={204202}>
                        <Badge variant="outline" key={93734}>
                          {selectedPrediction.context.sport}
                        </Badge>
                        <Badge variant="outline" key={93734}>
                          {selectedPrediction.context.event_type}
                        </Badge>
                        <Badge variant="outline" key={93734}>
                          {selectedPrediction.context.market_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card key={650115}>
              <CardContent className="p-8 text-center" key={791975}>
                <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" / key={439890}>
                <p className="text-gray-500" key={992645}>
                  Select a prediction from the High Confidence tab to view;
                  detailed analysis;
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedConfidenceVisualizer;

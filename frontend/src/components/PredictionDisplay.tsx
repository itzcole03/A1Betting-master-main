import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Target,
  Clock,
  Star,
  BarChart3,
  RefreshCw,
  Filter,
  ArrowUp,
  ArrowDown,
  Zap,
} from 'lucide-react';

interface Prediction {
  id: number;
  matchId: number;
  match: {
    homeTeam: string;
    awayTeam: string;
    sport: string;
    league: string;
    startTime: string;
  };
  predictions: {
    homeWin: number;
    awayWin: number;
    draw?: number;
  };
  confidenceScore: number;
  predictionStrength: string;
  mostLikelyOutcome: string;
  modelVersion: string;
  algorithmUsed: string;
  historicalAccuracy: number;
  overUnderPrediction?: number;
  spreadPrediction?: number;
  totalScorePrediction?: number;
  createdAt: string;
  features?: string[];
}

interface PredictionDisplayProps {
  predictions: Prediction[];
  confidence: number;
  historicalAccuracy: number;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({
  predictions,
  confidence,
  historicalAccuracy,
  onRefresh,
  isLoading = false,
}) => {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('confidence');
  const [viewMode, setViewMode] = useState<string>('grid');

  const sports = ['all', ...new Set(predictions.map(p => p.match.sport))];

  const filteredPredictions = predictions
    .filter(p => selectedSport === 'all' || p.match.sport === selectedSport)
    .sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b.confidenceScore - a.confidenceScore;
        case 'accuracy':
          return b.historicalAccuracy - a.historicalAccuracy;
        case 'time':
          return new Date(a.match.startTime).getTime() - new Date(b.match.startTime).getTime();
        default:
          return 0;
      }
    });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.8) return 'text-yellow-400';
    if (confidence >= 0.7) return 'text-orange-400';
    return 'text-red-400';
  };

  const getConfidenceBackground = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500/20 border-green-500/30';
    if (confidence >= 0.8) return 'bg-yellow-500/20 border-yellow-500/30';
    if (confidence >= 0.7) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
            AI Predictions
          </h1>
          <p className='text-gray-400'>Advanced machine learning powered betting predictions</p>
        </motion.div>

        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Overall Confidence</p>
                <p className={`text-2xl font-bold ${getConfidenceColor(confidence / 100)}`}>
                  {confidence.toFixed(1)}%
                </p>
              </div>
              <Brain className='w-8 h-8 text-purple-400' />
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Historical Accuracy</p>
                <p className='text-2xl font-bold text-green-400'>
                  {historicalAccuracy.toFixed(1)}%
                </p>
              </div>
              <Target className='w-8 h-8 text-green-400' />
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Active Predictions</p>
                <p className='text-2xl font-bold text-blue-400'>{predictions.length}</p>
              </div>
              <BarChart3 className='w-8 h-8 text-blue-400' />
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-8'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center space-x-4'>
              <div>
                <label className='block text-gray-400 text-sm mb-1'>Sport</label>
                <select
                  value={selectedSport}
                  onChange={e => setSelectedSport(e.target.value)}
                  className='px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
                >
                  {sports.map(sport => (
                    <option key={sport} value={sport} className='bg-slate-800'>
                      {sport === 'all' ? 'All Sports' : sport.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-gray-400 text-sm mb-1'>Sort By</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className='px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
                >
                  <option value='confidence' className='bg-slate-800'>
                    Confidence
                  </option>
                  <option value='accuracy' className='bg-slate-800'>
                    Accuracy
                  </option>
                  <option value='time' className='bg-slate-800'>
                    Start Time
                  </option>
                </select>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className='px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all disabled:opacity-50 flex items-center'
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Predictions Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {filteredPredictions.map(prediction => (
            <motion.div
              key={prediction.id}
              className={`border rounded-xl p-6 ${getConfidenceBackground(prediction.confidenceScore)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Match Header */}
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                  </h3>
                  <p className='text-gray-400 text-sm'>
                    {prediction.match.league} •{' '}
                    {new Date(prediction.match.startTime).toLocaleString()}
                  </p>
                </div>
                <div className='text-right'>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceBackground(prediction.confidenceScore)}`}
                  >
                    {prediction.predictionStrength}
                  </span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className='mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-gray-400 text-sm'>Confidence Score</span>
                  <span className={`font-bold ${getConfidenceColor(prediction.confidenceScore)}`}>
                    {(prediction.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
                <div className='w-full bg-gray-700 rounded-full h-2'>
                  <div
                    className={`h-2 rounded-full ${
                      prediction.confidenceScore >= 0.9
                        ? 'bg-green-400'
                        : prediction.confidenceScore >= 0.8
                          ? 'bg-yellow-400'
                          : prediction.confidenceScore >= 0.7
                            ? 'bg-orange-400'
                            : 'bg-red-400'
                    }`}
                    style={{ width: `${prediction.confidenceScore * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Predictions */}
              <div className='space-y-3 mb-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>{prediction.match.homeTeam} Win</span>
                  <div className='flex items-center'>
                    <span className='text-white font-semibold mr-2'>
                      {(prediction.predictions.homeWin * 100).toFixed(1)}%
                    </span>
                    {prediction.mostLikelyOutcome === 'home_win' && (
                      <Star className='w-4 h-4 text-yellow-400' />
                    )}
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-gray-300'>{prediction.match.awayTeam} Win</span>
                  <div className='flex items-center'>
                    <span className='text-white font-semibold mr-2'>
                      {(prediction.predictions.awayWin * 100).toFixed(1)}%
                    </span>
                    {prediction.mostLikelyOutcome === 'away_win' && (
                      <Star className='w-4 h-4 text-yellow-400' />
                    )}
                  </div>
                </div>

                {prediction.predictions.draw && (
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-300'>Draw</span>
                    <div className='flex items-center'>
                      <span className='text-white font-semibold mr-2'>
                        {(prediction.predictions.draw * 100).toFixed(1)}%
                      </span>
                      {prediction.mostLikelyOutcome === 'draw' && (
                        <Star className='w-4 h-4 text-yellow-400' />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Predictions */}
              {(prediction.overUnderPrediction || prediction.spreadPrediction) && (
                <div className='border-t border-white/20 pt-4 space-y-2'>
                  {prediction.overUnderPrediction && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400 text-sm'>Over/Under</span>
                      <span className='text-white text-sm'>{prediction.overUnderPrediction}</span>
                    </div>
                  )}
                  {prediction.spreadPrediction && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400 text-sm'>Spread</span>
                      <span className='text-white text-sm'>{prediction.spreadPrediction}</span>
                    </div>
                  )}
                  {prediction.totalScorePrediction && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400 text-sm'>Total Score</span>
                      <span className='text-white text-sm'>{prediction.totalScorePrediction}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Model Info */}
              <div className='border-t border-white/20 pt-4 mt-4'>
                <div className='flex items-center justify-between text-xs text-gray-400'>
                  <span>Model: {prediction.modelVersion}</span>
                  <span>Accuracy: {(prediction.historicalAccuracy * 100).toFixed(1)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPredictions.length === 0 && (
          <div className='text-center py-12'>
            <Brain className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-400 mb-2'>No Predictions Available</h3>
            <p className='text-gray-500'>
              {selectedSport === 'all'
                ? 'No predictions are currently available for any sport.'
                : `No predictions are currently available for ${selectedSport}.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Default component with mock data
const PredictionDisplayWithMockData: React.FC = () => {
  const mockPredictions: Prediction[] = [
    {
      id: 1,
      matchId: 1,
      match: {
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        sport: 'basketball',
        league: 'NBA',
        startTime: '2024-01-15T20:00:00Z',
      },
      predictions: {
        homeWin: 0.65,
        awayWin: 0.35,
      },
      confidenceScore: 0.82,
      predictionStrength: 'Strong',
      mostLikelyOutcome: 'home_win',
      modelVersion: 'v2.1.0',
      algorithmUsed: 'ensemble',
      historicalAccuracy: 0.74,
      overUnderPrediction: 225.5,
      spreadPrediction: -5.5,
      totalScorePrediction: 228,
      createdAt: '2024-01-15T09:00:00Z',
    },
    {
      id: 2,
      matchId: 2,
      match: {
        homeTeam: 'Cowboys',
        awayTeam: 'Giants',
        sport: 'football',
        league: 'NFL',
        startTime: '2024-01-16T18:00:00Z',
      },
      predictions: {
        homeWin: 0.78,
        awayWin: 0.22,
      },
      confidenceScore: 0.91,
      predictionStrength: 'Very Strong',
      mostLikelyOutcome: 'home_win',
      modelVersion: 'v2.1.0',
      algorithmUsed: 'ensemble',
      historicalAccuracy: 0.82,
      overUnderPrediction: 45.5,
      spreadPrediction: -7.5,
      totalScorePrediction: 48,
      createdAt: '2024-01-15T09:00:00Z',
    },
  ];

  const handleRefresh = () => {
    console.log('Refreshing predictions...');
  };

  return (
    <PredictionDisplay
      predictions={mockPredictions}
      confidence={85.5}
      historicalAccuracy={78.2}
      onRefresh={handleRefresh}
      isLoading={false}
    />
  );
};

export default PredictionDisplayWithMockData;
export { PredictionDisplay };

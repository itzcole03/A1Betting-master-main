import React from 'react.ts';
import GlassCard from './GlassCard.ts';

export interface PredictionExplanationData {
  sentiment?: string;
  news?: string;
  playerProps?: string;
  marketMovement?: string;
}

export interface PredictionExplanationOverlayProps {
  open: boolean;
  onClose: () => void;
  data: PredictionExplanationData;
}

const PredictionExplanationOverlay: React.FC<PredictionExplanationOverlayProps key={486023}> = ({ open, onClose, data }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" key={558927}>
      <div className="relative w-full max-w-lg mx-auto animate-scale-in" key={829811}>
        <GlassCard className="p-8" key={826343}>
          <button;
            className="absolute top-2 right-2 text-gray-400 hover:text-primary-500 text-2xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close"
           key={350308}>
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-primary-600" key={905789}>Why this prediction?</h2>
          <ul className="space-y-3" key={693962}>
            {data.sentiment && (
              <li key={377233}>
                <span className="font-semibold text-pink-400" key={375157}>Sentiment:</span> {data.sentiment}
              </li>
            )}
            {data.news && (
              <li key={377233}>
                <span className="font-semibold text-blue-400" key={561966}>News Impact:</span> {data.news}
              </li>
            )}
            {data.playerProps && (
              <li key={377233}>
                <span className="font-semibold text-yellow-400" key={820217}>Player Props:</span> {data.playerProps}
              </li>
            )}
            {data.marketMovement && (
              <li key={377233}>
                <span className="font-semibold text-green-400" key={612983}>Market Movement:</span> {data.marketMovement}
              </li>
            )}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};

export default PredictionExplanationOverlay;

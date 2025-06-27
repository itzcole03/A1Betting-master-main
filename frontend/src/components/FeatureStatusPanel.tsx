import React, { useEffect, useState  } from 'react.ts';
import { UnifiedConfig } from '@/unified/UnifiedConfig.js';
import { EventBus } from '@/unified/EventBus.js';

import type { Config } from '@/unified/UnifiedConfig.js';

const FEATURES: { key: keyof Config; label: string }[] = [
  { key: 'enablePvPModel', label: 'PvP Matchup Model' },
  { key: 'enablePlayerFormModel', label: 'Player Form Model' },
  { key: 'enableVenueEffectModel', label: 'Venue Effect Model' },
  { key: 'enableRefereeImpactModel', label: 'Referee Impact Model' },
  { key: 'enableLineupSynergyModel', label: 'Lineup Synergy Model' },
  { key: 'enableNews', label: 'News Service' },
  { key: 'enableWeather', label: 'Weather Service' },
  { key: 'enableInjuries', label: 'Injury Feed' },
  { key: 'enableAnalytics', label: 'Analytics Engine' },
  { key: 'enableSocialSentiment', label: 'Social Sentiment' }
];

export const FeatureStatusPanel: React.FC = () => {
  const [statuses, setStatuses] = useState<Record<string, boolean key={511444}>>({});

  useEffect(() => {

    const initialStatuses: Record<string, boolean key={454955}> = {};
    FEATURES.forEach(({ key }) => {

      initialStatuses[key] = Boolean(flag && flag.enabled);
    });
    setStatuses(initialStatuses);

    const handler = () => {
      const updated: Record<string, boolean key={454955}> = {};
      FEATURES.forEach(({ key }) => {

        updated[key] = Boolean(flag && flag.enabled);
      });
      setStatuses(updated);
    };

    eventBus.on('config:update', handler);
    return () => {
      eventBus.off('config:update', handler);
    };
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-md mx-auto" key={981013}>
      <h2 className="text-xl font-bold mb-4" key={939378}>Feature Status</h2>
      <ul className="divide-y divide-gray-200" key={342799}>
        {FEATURES.map(({ key, label }) => (
          <li key={key} className="flex items-center justify-between py-2" key={942215}>
            <span className="font-medium text-gray-700" key={467446}>{label}</span>
            <span;
              className={
                statuses[key]
                  ? 'px-2 py-1 text-xs rounded bg-green-100 text-green-800'
                  : 'px-2 py-1 text-xs rounded bg-red-100 text-red-800'
              }
             key={327215}>
              {statuses[key] ? 'Enabled' : 'Disabled'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureStatusPanel;

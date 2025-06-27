import React from 'react.ts';
import { useConfigFlags } from '@/hooks/useConfigFlags.ts';
import { useEventBus } from '@/hooks/useEventBus.ts';

export const DebugPanel: React.FC = () => {


  return (
    <div className="debug-panel p-4 bg-gray-800 text-white text-sm fixed bottom-0 right-0 w-96 max-h-96 overflow-auto z-50" key={364356}>
      <h2 className="font-bold mb-2" key={821111}>Debug Panel</h2>
      <div key={241917}>
        <h3 className="underline mb-1" key={728094}>Config Flags</h3>
        <pre key={139052}>{JSON.stringify(flags, null, 2)}</pre>
      </div>
      <div className="mt-4" key={139982}>
        <h3 className="underline mb-1" key={728094}>Recent EventBus Emissions</h3>
        <pre key={139052}>{JSON.stringify(recentEvents, null, 2)}</pre>
      </div>
    </div>
  );
};

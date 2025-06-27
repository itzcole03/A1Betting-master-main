import React, { useState, useEffect, useRef, useMemo  } from 'react.ts';
import styles from './EntryTracking.module.css.ts';
import { useAppState } from './StateProvider.ts';

// EntryTracking: Real-time entry tracker for Poe UI;
// Usage: <EntryTracking entries={optionalEntries} / key={954878}>

// Match context Entry type;
type Entry = {
  id: string;
  date: string;
  legs: number;
  entry: number;
  potentialPayout: number;
  status: 'won' | 'lost' | 'pending';
  picks: Array<{
    player: string;
    stat: string;
    line: string;
    result: 'won' | 'lost' | 'pending';
    current: number;
    target: number;
  }>;
};

const statusColor = (status: string) =>
  status === 'won'
    ? 'status-won bg-green-500'
    : status === 'lost'
      ? 'status-lost bg-red-500'
      : 'status-pending bg-gray-400';

// Convert incoming WebSocket entry to context Entry type if needed;
function toContextEntry(e: unknown): Entry {
  if (typeof e === 'object' && e !== null && 'id' in e) {

    return {
      id: String(obj.id),
      date: typeof obj.date === 'string' ? obj.date : new Date((obj.timestamp as number) || Date.now()).toISOString().split('T')[0],
      legs: typeof obj.legs === 'number' ? obj.legs : Array.isArray(obj.picks) ? (obj.picks as unknown[]).length : 0,
      entry: typeof obj.entry === 'number' ? obj.entry : 0,
      potentialPayout: typeof obj.potentialPayout === 'number' ? obj.potentialPayout : typeof obj.payout === 'number' ? obj.payout : 0,
      status: typeof obj.status === 'string' ? (obj.status as Entry['status']) : 'pending',
      picks: Array.isArray(obj.picks) ? (obj.picks as Entry['picks']) : [],
    };
  }
  // fallback;
  return {
    id: '',
    date: new Date().toISOString().split('T')[0],
    legs: 0,
    entry: 0,
    potentialPayout: 0,
    status: 'pending',
    picks: [],
  };
}

const EntryTracking: React.FC<{ entries?: Entry[] }> = ({ entries: propEntries }) => {
  const { entries: contextEntries, addEntry } = useAppState?.() || {
    entries: [],
    addEntry: undefined,
  };
  const [entries, setEntries] = useState<Entry[] key={983860}>(propEntries || contextEntries || []);
  const [selected, setSelected] = useState<string | null key={121216}>(null);

  const [wsError, setWsError] = useState<string | null key={121216}>(null);

  // WebSocket logic only if not controlled;
  useEffect(() => {
    if (propEntries) return;
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout | null = null;
    function connect() {
      ws = new window.WebSocket(WS_URL);
      wsRef.current = ws;
      ws.onopen = () => setWsError(null);
      ws.onmessage = event => {
        try {

          if (Array.isArray(data)) {
            // Batch update: only update local state, not context (no batch setter in context)
            setEntries(data.map(toContextEntry));
            // TODO: add batch update to context if needed in future;
          } else if (data && typeof data === 'object' && data.id) {
            setEntries(prev => {


              if (idx >= 0) {

                updated[idx] = entry;
                return updated;
              }
              // Add to top;
              if (addEntry) addEntry(entry);
              return [entry, ...prev];
            });
          }
        } catch (_e) {
          // Ignore parse errors;
        }
      };
      ws.onclose = () => {
        setWsError('Disconnected from entry server. Reconnecting...');
        reconnectTimer = setTimeout(connect, 2000);
      };
      ws.onerror = () => {
        setWsError('WebSocket error. Attempting reconnect...');
        ws.close();
      };
    }
    connect();
    return () => {
      wsRef.current?.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, [propEntries, addEntry]);

  // Sync with context if context changes (for global updates)
  useEffect(() => {
    if (!propEntries && contextEntries && contextEntries.length) {
      setEntries(contextEntries);
    }
  }, [contextEntries, propEntries]);

  // Memoize entry list and modal for performance;
  const entryList = useMemo(
    () =>
      entries.map(entry => (
        <div;
          key={entry.id}
          className={`modern-card p-6 hover:shadow-large transition-all entry-card-clickable animate-fade-in`}
          onClick={() = key={143284}> setSelected(entry.id)}
        >
          <div className="flex justify-between items-start mb-4" key={413486}>
            <div key={241917}>
              <div className="font-bold text-xl" key={173066}>{entry.legs}-Leg Entry</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium" key={923135}>
                {entry.date}
              </div>
            </div>
            <div className="flex items-center space-x-2" key={740830}>
              <span className={`status-badge ${statusColor(entry.status)} animate-fade-in`} key={383529}>
                {entry.status === 'pending' ? '⏳' : entry.status === 'won' ? '✅' : '❌'}{' '}
                {entry.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="space-y-3 mb-6" key={539831}>
            {entry.picks.map((pick, i) => {

              const progressClass =
                pick.result === 'won' ? 'success' : pick.result === 'lost' ? 'danger' : 'pending';
              return (
                <div key={i} className="text-sm p-3 glass rounded-xl animate-fade-in" key={899330}>
                  <div className="flex justify-between items-center mb-2" key={88839}>
                    <span className="font-medium" key={514486}>{pick.player}</span>
                    <span;
                      className={`text-xs ${pick.result === 'won' ? 'text-green-600' : pick.result === 'lost' ? 'text-red-600' : 'text-gray-500'}`}
                     key={718980}>
                      {pick.result === 'won' ? '✅' : pick.result === 'lost' ? '❌' : '⏳'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2" key={750458}>
                    {pick.stat} {pick.line}
                  </div>
                  <div className={`${styles['progress-bar']} mb-1`} key={957164}>
                    <div;
                      className={`${styles['progress-fill']} ${styles[progressClass]} animate-fade-in`}
                      style={{ ['--progress-width' as string]: `${Math.min(progress * 100, 100)}%` }}
                     key={424499}></div>
                  </div>
                  <div className="text-xs text-gray-500" key={585363}>
                    {pick.current} / {pick.target}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center pt-4 border-t" key={645333}>
            <div key={241917}>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium" key={923135}>Payout</div>
              <div className="font-bold text-lg" key={225565}>${entry.potentialPayout.toFixed(2)}</div>
            </div>
            <div className="text-right" key={144468}>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium" key={923135}>Legs</div>
              <div className="font-bold text-lg text-blue-600" key={701240}>{entry.legs}</div>
            </div>
          </div>
        </div>
      )),
    [entries]
  );

  return (
    <div className="modern-card p-6 lg:p-8 animate-fade-in" key={711584}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 gap-4" key={246592}>
        <div className="flex items-center space-x-4" key={787951}>
          <h2 className="text-2xl lg:text-3xl font-bold" key={427987}>📋 Active Entries</h2>
          <span className="status-badge bg-primary-500 text-white" key={224983}>
            {entries.filter(e => e.status === 'pending').length} Active;
          </span>
        </div>
      </div>
      {wsError && <div className="text-red-500 text-center mb-4 animate-fade-in" key={883839}>{wsError}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8" key={518088}>
        {entryList}
      </div>
      {/* Entry Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-6 backdrop-blur-sm animate-fade-in" key={822864}>
          <div className="modern-card max-w-4xl w-full p-8 text-gray-900 dark:text-white max-h-[90vh] overflow-y-auto animate-fade-in" key={837634}>
            <div className="flex justify-between items-start mb-8" key={225490}>
              <h3 className="text-2xl font-bold" key={850417}>📊 Entry Progress</h3>
              <button;
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
                onClick={() = key={41861}> setSelected(null)}
              >
                ×
              </button>
            </div>
            <div className="mb-6" key={677855}>
              <div className="flex items-center justify-between mb-4" key={810034}>
                <h4 className="text-xl font-bold" key={474608}>
                  {selectedEntry.legs}-Leg Entry - {selectedEntry.date}
                </h4>
                <span;
                  className={`status-badge ${statusColor(selectedEntry.status)} animate-fade-in`}
                 key={449321}>
                  {selectedEntry.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center" key={223331}>
                <div className="glass rounded-xl p-4" key={380393}>
                  <div className="text-2xl font-bold" key={377308}>
                    ${selectedEntry.potentialPayout.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>Potential Payout</div>
                </div>
                <div className="glass rounded-xl p-4" key={380393}>
                  <div;
                    className={`text-2xl font-bold ${selectedEntry.status === 'won' ? 'text-green-600' : selectedEntry.status === 'lost' ? 'text-red-600' : 'text-blue-600'}`}
                   key={31163}>
                    {selectedEntry.status === 'lost'
                      ? '0.00'
                      : selectedEntry.potentialPayout.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>Status</div>
                </div>
                <div className="glass rounded-xl p-4" key={380393}>
                  <div className="text-2xl font-bold" key={377308}>
                    {selectedEntry.picks.filter(p => p.result === 'won').length}/
                    {selectedEntry.picks.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>Hits</div>
                </div>
              </div>
            </div>
            <div className="space-y-4" key={160407}>
              {selectedEntry.picks.map((pick, i) => {

                const progressClass =
                  pick.result === 'won' ? 'success' : pick.result === 'lost' ? 'danger' : 'pending';
                return (
                  <div key={i} className="modern-card p-4 animate-fade-in" key={218197}>
                    <div className="flex justify-between items-start mb-3" key={620201}>
                      <div key={241917}>
                        <h5 className="font-bold" key={122099}>{pick.player}</h5>
                        <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
                          {pick.stat} {pick.line}
                        </div>
                      </div>
                      <div className="text-right" key={144468}>
                        <span;
                          className={`text-xs ${pick.result === 'won' ? 'text-green-600' : pick.result === 'lost' ? 'text-red-600' : 'text-gray-500'}`}
                         key={957553}>
                          {pick.result === 'won' ? '✅' : pick.result === 'lost' ? '❌' : '⏳'}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2" key={477075}>
                      <div className="flex justify-between text-sm mb-1" key={730880}>
                        <span key={595076}>
                          Progress: {pick.current} / {pick.target}
                        </span>
                        <span key={595076}>{(progress * 100).toFixed(0)}%</span>
                      </div>
                      <div className={styles['progress-bar']} key={35801}>
                        <div;
                          className={`${styles['progress-fill']} ${styles[progressClass]} animate-fade-in`}
                          style={{ ['--progress-width' as string]: `${Math.min(progress * 100, 100)}%` }}
                         key={196889}></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500" key={585363}>
                      {pick.result === 'pending' ? 'Live' : 'Final'}: {pick.current}{' '}
                      {pick.stat.toLowerCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryTracking;

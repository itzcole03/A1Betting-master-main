import React, { useEffect, useRef, useState  } from 'react.ts';
import { useApiRequest } from '@/hooks/useApiRequest.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';

interface Headline {
  headline: string;
  timestamp: number;
  link?: string;
  relatedPlayers: { id: string; name: string }[];
  sentiment: {
    twitter?: number;
    reddit?: number;
    news?: number;
  };
}

interface PlayerSentiment {
  twitter?: number;
  reddit?: number;
  news?: number;
}

const getSentimentBadge = (sentiment: PlayerSentiment) => {
  // Simple badge: green if positive, red if negative, gray if neutral/undefined;
  const avg =
    sentiment &&
    [sentiment.twitter, sentiment.reddit, sentiment.news]
      .filter(v => typeof v === 'number')
      .reduce((a, b) => a + (b || 0), 0) /
      ([sentiment.twitter, sentiment.reddit, sentiment.news].filter(v => typeof v === 'number')
        .length || 1);
  const color = 'bg-gray-300 text-gray-700';
  const icon = '−';
  if (avg > 0.2) {
    color = 'bg-green-200 text-green-700';
    icon = '▲';
  } else if (avg < -0.2) {
    color = 'bg-red-200 text-red-700';
    icon = '▼';
  }
  return (
    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${color}`} key={196937}>
      {icon} {(avg * 100).toFixed(0)}%
    </span>
  );
};

const ESPNHeadlinesTicker: React.FC = () => {
  const [headlines, setHeadlines] = useState<Headline[] key={580837}>([]);
  const [playerSentiments, setPlayerSentiments] = useState<Record<string, PlayerSentiment key={890940}>>({});
  const [paused, setPaused] = useState(false);

  // WebSocket connection for ESPN feed;
  useWebSocket({
    url: 'ws://localhost:3001/espn-feed',
    onMessage: msg => {
      // Assume msg.data is a Headline or array of Headline;
      let newHeadlines: Headline[] = [];
      if (Array.isArray(msg.data)) {
        newHeadlines = msg.data as Headline[];
      } else if (msg.data && typeof msg.data === 'object') {
        newHeadlines = [msg.data as Headline];
      }
      setHeadlines(prev => {
        // Merge, deduplicate by headline+timestamp;


        return all.filter(h => {

          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      });
    },
  });

  // Fetch sentiment for each related player;
  useEffect(() => {
    const fetchSentiment = async (playerId: string) => {
      try {

        if (!res.ok) return;

        setPlayerSentiments(prev => ({ ...prev, [playerId]: data }));
      } catch {}
    };

    Array.from(new Set(playerIds)).forEach(id => {
      if (!playerSentiments[id]) fetchSentiment(id);
    });
    // Optionally, poll every 30s for live update;
    const interval = setInterval(() => {
      Array.from(new Set(playerIds)).forEach(fetchSentiment);
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line;
  }, [headlines]);

  // Auto-scroll logic;
  useEffect(() => {
    if (paused || !tickerRef.current) return;

    let frame: number;
    let start: number | null = null;



    const speed = 40; // px/sec;
    function step(ts: number) {
      if (start === null) start = ts;


      ticker.scrollLeft = px;
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused, headlines]);

  if (!headlines.length) {
    return (
      <div className="glass rounded-2xl px-4 py-2 text-gray-500 animate-pulse-soft" key={833397}>
        Loading ESPN headlines...
      </div>
    );
  }

  return (
    <div;
      ref={tickerRef}
      className="news-ticker glass rounded-2xl px-4 py-2 overflow-x-auto whitespace-nowrap cursor-pointer relative"
      style={{ transition: 'background 0.2s' }}
      onMouseEnter={() = key={122151}> setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="inline-flex items-center gap-8 news-ticker-content" key={433645}>
        {headlines.map((h, i) => (
          <span key={h.headline + h.timestamp + i} className="flex items-center gap-2" key={636879}>
            <a;
              className="hover:underline text-blue-700 dark:text-blue-300 font-semibold"
              href={h.link || '#'}
              rel="noopener noreferrer"
              target="_blank"
              title={new Date(h.timestamp).toLocaleString()}
             key={806842}>
              {h.headline}
            </a>
            {/* Show sentiment badges for each related player */}
            {h.relatedPlayers.map(p => (
              <span key={p.id} className="ml-1" key={415867}>
                <span className="text-xs text-gray-500" key={239425}>{p.name}</span>
                {getSentimentBadge(playerSentiments[p.id] || {})}
              </span>
            ))}
          </span>
        ))}
      </div>
      {/* Pause overlay */}
      {paused && <div className="absolute inset-0 bg-black bg-opacity-10 pointer-events-none" / key={877992}>}
    </div>
  );
};

export default React.memo(ESPNHeadlinesTicker);

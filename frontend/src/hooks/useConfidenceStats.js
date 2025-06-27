import { useState, useEffect } from 'react';

export default function useConfidenceStats(props) {
  const [stats, setStats] = useState({ average: 0, countAboveThreshold: 0 });

  useEffect(() => {
    if (!props || props.length === 0) return;


    setStats({ average: avg, countAboveThreshold: count });
  }, [props]);

  return stats;
}
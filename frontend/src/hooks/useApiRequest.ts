import { useState, useEffect, useCallback, useRef } from 'react.ts';



interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

interface UseApiRequestOptions {
  cacheTime?: number;
  retries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

interface UseApiRequestState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
}

const globalCache: Cache = {};

export function useApiRequest<T>(
  url: string,
  {
    cacheTime = 5 * 60 * 1000, // 5 minutes;
    retries = 3,
    retryDelay = 1000,
    onError,
    enabled = true;
  }: UseApiRequestOptions = {}
) {
  const [state, setState] = useState<UseApiRequestState<T>>({
    data: null,
    error: null,
    isLoading: true,
    isValidating: false;
  });


  const fetchData = useCallback(
    async (shouldRetry = true): Promise<T> => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current.signal,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update cache;
        globalCache[url] = {
          data,
          timestamp: Date.now()
        };

        return data;
      } catch (error) {
        if (error instanceof Error) {
          if (
            shouldRetry &&
            retryCountRef.current < retries &&
            error.name !== 'AbortError'
          ) {
            retryCountRef.current++;
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return fetchData(true);
          }

          onError?.(error);
          throw error;
        }
        throw new Error('An unknown error occurred');
      }
    },
    [url, retries, retryDelay, onError]
  );

  const mutate = useCallback(async () => {
    setState(prev => ({ ...prev, isValidating: true }));
    try {

      setState({
        data,
        error: null,
        isLoading: false,
        isValidating: false;
      });
    } catch (error) {
      if (error instanceof Error) {
        setState(prev => ({
          ...prev,
          error,
          isValidating: false;
        }));
      }
    }
  }, [fetchData]);

  useEffect(() => {
    if (!enabled) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const isCacheValid =
      cachedData && Date.now() - cachedData.timestamp < cacheTime;

    if (isCacheValid) {
      setState({
        data: cachedData.data,
        error: null,
        isLoading: false,
        isValidating: false;
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    fetchData()
      .then(data => {
        setState({
          data,
          error: null,
          isLoading: false,
          isValidating: false;
        });
      })
      .catch(error => {
        if (error instanceof Error) {
          setState({
            data: null,
            error,
            isLoading: false,
            isValidating: false;
          });
        }
      });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, cacheTime, enabled, fetchData]);

  return {
    ...state,
    mutate;
  };
}

// Example usage:
/*
function PlayerStats({ playerId }: { playerId: string }) {
  const { data, error, isLoading, mutate } = useApiRequest<PlayerStats>(
    `/api/players/${playerId}/stats`,
    {
      cacheTime: 60000, // 1 minute;
      retries: 2,
      onError: (error) => // console statement removed
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.playerName}</h2>
      <button onClick={mutate}>Refresh Stats</button>
      {/* Display stats *//*}
    </div>
  );
}
*/ 
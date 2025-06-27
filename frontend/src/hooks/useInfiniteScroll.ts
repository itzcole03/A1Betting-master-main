import { useEffect, useRef, useState, useCallback } from 'react.ts';



interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

interface UseInfiniteScrollResult {
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

export function useInfiniteScroll<T>(
  fetchMore: () => Promise<T[]>,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollResult {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {

      if (newItems.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      // console statement removed
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, fetchMore]);
  useEffect(() => {

    if (!container) return;

    const { threshold = 0.5, rootMargin = '20px', root = null } = options;

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        threshold,
        rootMargin,
        root;
      }
    );

    observer.current.observe(container);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore, options]);

  return {
    isLoading,
    hasMore,
    loadMore,
    containerRef;
  };
} 
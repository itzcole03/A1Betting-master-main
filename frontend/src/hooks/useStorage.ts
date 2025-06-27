import { useCallback } from 'react.ts';

export const useStorage = () => {
  const clearAllCaches = useCallback(async () => {
    try {
      // Clear localStorage;
      localStorage.clear();

      // Clear sessionStorage;
      sessionStorage.clear();

      // Clear IndexedDB;

      await Promise.all(
        databases.map(db => {
          if (db.name) {
            return new Promise(resolve => {

              request.onsuccess = () => resolve(true);
              request.onerror = () => resolve(false);
            });
          }
          return Promise.resolve();
        })
      );

      // Clear Cache API;

      await Promise.all(cacheNames.map(name => caches.delete(name)));

      return true;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }, []);

  return { clearAllCaches };
};

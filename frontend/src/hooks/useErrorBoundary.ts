import { useCallback } from 'react.ts';
import { toast } from 'react-toastify.ts';

export const useErrorBoundary = () => {
  const showBoundary = useCallback((error: Error) => {
    // console statement removed
    toast.error(error.message || 'An error occurred');
  }, []);

  return { showBoundary };
};

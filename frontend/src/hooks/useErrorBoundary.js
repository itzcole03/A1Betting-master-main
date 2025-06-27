import { useCallback } from 'react';
import { toast } from 'react-toastify';
export const useErrorBoundary = () => {
    const showBoundary = useCallback((error) => {
        // console statement removed
        toast.error(error.message || 'An error occurred');
    }, []);
    return { showBoundary };
};

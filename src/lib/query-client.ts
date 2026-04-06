import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '../utils/error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 401 or 403
        if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minute
    },
    mutations: {
      onError: (error) => {
        const message = getErrorMessage(error);
        toast.error(message);
      },
    },
  },
});

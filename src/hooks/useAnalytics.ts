import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary, getChartData } from '../services/api/analytics';

export function useAnalytics() {
  return useQuery<any>({
    queryKey: ['analytics'],
    queryFn: getAnalyticsSummary,
  });
}

export function useChartData(range: string = '7d') {
  return useQuery<any[]>({
    queryKey: ['chartData', range],
    queryFn: () => getChartData(range),
  });
}

import { AnalyticsSummary } from '../../types';
import { analyticsRepository } from '../repositories';

export const getAnalyticsSummary = (): Promise<AnalyticsSummary> => {
  return analyticsRepository.getAnalyticsSummary();
};

export const getChartData = (range: string = '7d'): Promise<any[]> => {
  return analyticsRepository.getChartData(range);
};

export const getIssuesByCategory = (): Promise<{ category: string; count: number }[]> => {
  return analyticsRepository.getIssuesByCategory();
};

export const getIssuesByRegion = (): Promise<{ region: string; count: number }[]> => {
  return analyticsRepository.getIssuesByRegion();
};

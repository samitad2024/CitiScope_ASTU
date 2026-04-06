import { AnalyticsSummary } from '../../types';
import { apiClient } from '../../lib/api-client';
import { AnalyticsRepository } from './AnalyticsRepository';

export class HttpAnalyticsRepository implements AnalyticsRepository {
  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    const response = await apiClient.get<AnalyticsSummary>('/analytics/summary');
    return response.data;
  }

  async getChartData(range: string = '7d'): Promise<any[]> {
    const response = await apiClient.get<any[]>('/analytics/chart', { params: { range } });
    return response.data;
  }

  async getIssuesByCategory(): Promise<{ category: string; count: number }[]> {
    const response = await apiClient.get<{ category: string; count: number }[]>('/analytics/issues-by-category');
    return response.data;
  }

  async getIssuesByRegion(): Promise<{ region: string; count: number }[]> {
    const response = await apiClient.get<{ region: string; count: number }[]>('/analytics/issues-by-region');
    return response.data;
  }
}

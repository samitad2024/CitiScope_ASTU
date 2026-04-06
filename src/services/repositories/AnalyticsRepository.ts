import { AnalyticsSummary } from '../../types';

export interface AnalyticsRepository {
  getAnalyticsSummary(): Promise<AnalyticsSummary>;
  getChartData(range?: string): Promise<any[]>;
  getIssuesByCategory(): Promise<{ category: string; count: number }[]>;
  getIssuesByRegion(): Promise<{ region: string; count: number }[]>;
}

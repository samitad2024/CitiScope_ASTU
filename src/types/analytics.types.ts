export interface DashboardStats {
  totalIssues: number;
  openIssues: number;
  inProgress: number;
  resolved: number;
  closed: number;
  totalUsers: number;
  activeTechnicians: number;
  averageResolutionTime: number; // in hours
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface AnalyticsSummary {
  stats: DashboardStats;
  issueTrends: ChartDataPoint[];
  categoryDistribution: ChartDataPoint[];
  regionalStats: {
    region: string;
    issues: number;
    resolved: number;
  }[];
}

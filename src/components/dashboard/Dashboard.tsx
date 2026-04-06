import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertTriangle,
  Activity,
  Plus,
  FileText,
  UserPlus,
  Settings as SettingsIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { mockChartData, mockIssues, mockAuditLogs } from '../../services/mock';
import { useAnalytics, useChartData } from '../../hooks/useAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Link } from 'react-router-dom';
import { Meta } from '../shared/Meta';
import { cn } from '../../lib/utils';

export default function Dashboard() {
  const { data: analytics, isLoading: isAnalyticsLoading, refetch: refetchAnalytics, isFetching: isAnalyticsFetching } = useAnalytics();
  const { data: chartData = [], isLoading: isChartLoading } = useChartData();

  const quickActions = [
    { title: 'Report Issue', icon: Plus, link: '/issues', color: 'bg-blue-500' },
    { title: 'Add User', icon: UserPlus, link: '/users', color: 'bg-purple-500' },
    { title: 'View Map', icon: MapPin, link: '/map', color: 'bg-green-500' },
    { title: 'Export Data', icon: FileText, link: '/reports', color: 'bg-orange-500' },
  ];

  const stats = [
    { 
      title: 'Total Issues', 
      value: analytics?.totalIssues || 0, 
      change: '+12%', 
      trend: 'up', 
      icon: BarChart3,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      title: 'Open Issues', 
      value: analytics?.openIssues || 0, 
      change: '+5%', 
      trend: 'up', 
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    { 
      title: 'In Progress', 
      value: analytics?.inProgress || 0, 
      change: '+8%', 
      trend: 'up', 
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    { 
      title: 'Resolved', 
      value: analytics?.resolved || 0, 
      change: '+18%', 
      trend: 'up', 
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
  ];

  const statusData = [
    { name: 'Open', value: analytics?.openIssues || 0, color: '#ef4444' },
    { name: 'In Progress', value: analytics?.inProgress || 0, color: '#f59e0b' },
    { name: 'Resolved', value: analytics?.resolved || 0, color: '#10b981' },
    { name: 'Closed', value: (analytics?.totalIssues || 0) - ((analytics?.openIssues || 0) + (analytics?.inProgress || 0) + (analytics?.resolved || 0)), color: '#6b7280' },
  ];

  return (
    <div className="space-y-8">
      <Meta 
        title="Dashboard | CitiScope" 
        description="Overview of smart city infrastructure issues and analytics."
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">National Multi-Tier Civic Intelligence Platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refetchAnalytics()}
            disabled={isAnalyticsFetching}
          >
            <RefreshCw className={isAnalyticsFetching ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-4 w-4"} />
            Refresh Data
          </Button>
          <Button size="sm">Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {isAnalyticsLoading ? (
                <Skeleton className="h-8 w-20 mb-1" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, i) => (
          <Link key={i} to={action.link}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-dashed">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("p-2 rounded-lg text-white", action.color)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="font-medium text-sm">{action.title}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>Issue Trends</CardTitle>
            <CardDescription>Daily reported vs resolved issues over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              {isChartLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#888' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#888' }}
                    />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="issues" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorIssues)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorResolved)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Issues by Status</CardTitle>
            <CardDescription>Current distribution of issue states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {isAnalyticsLoading ? (
                <Skeleton className="h-full w-full rounded-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Issues</CardTitle>
              <CardDescription>Latest infrastructure problems reported in the system.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/issues">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIssues.slice(0, 5).map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {issue.woreda}, {issue.zone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {issue.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={issue.priority === 'urgent' ? 'destructive' : 'secondary'}
                        className="capitalize text-[10px]"
                      >
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed by administrators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockAuditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{log.action.replace('_', ' ')}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      {new Date(log.timestamp).toLocaleTimeString()} • {log.userName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs" size="sm">
              View All Audit Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

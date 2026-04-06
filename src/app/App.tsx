import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';
import { AppProvider } from '../components/shared/AppProvider';

// Lazy load components
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const IssueList = lazy(() => import('../components/issues/IssueList'));
const IssueDetail = lazy(() => import('../components/issues/IssueDetail'));
const MapView = lazy(() => import('../components/map/MapView'));
const AnalyticsDashboard = lazy(() => import('../components/analytics/AnalyticsDashboard'));
const IoTSensors = lazy(() => import('../components/iot/IoTSensors'));
const UserManagement = lazy(() => import('../components/users/UserManagement'));
const AuditLogs = lazy(() => import('../components/users/AuditLogs'));
const Settings = lazy(() => import('../components/layout/Settings'));
const Notifications = lazy(() => import('../features/notifications/components/Notifications'));
const Reports = lazy(() => import('../components/shared/Reports'));

function LoadingFallback() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

function Unauthorized() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">403 - Unauthorized</h1>
      <p className="text-muted-foreground">You do not have permission to access this page.</p>
      <a href="/" className="text-primary hover:underline">Return to Dashboard</a>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="issues" element={<IssueList />} />
              <Route path="issues/:id" element={<IssueDetail />} />
              <Route path="map" element={<MapView />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="sensors" element={<IoTSensors />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="audit-logs" element={<AuditLogs />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="reports" element={<Reports />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

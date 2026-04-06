import { MockUserRepository } from './MockUserRepository';
import { HttpUserRepository } from './HttpUserRepository';
import { MockIssueRepository } from './MockIssueRepository';
import { HttpIssueRepository } from './HttpIssueRepository';
import { MockAnalyticsRepository } from './MockAnalyticsRepository';
import { HttpAnalyticsRepository } from './HttpAnalyticsRepository';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true; // Default to true for now

export const userRepository = USE_MOCK ? new MockUserRepository() : new HttpUserRepository();
export const issueRepository = USE_MOCK ? new MockIssueRepository() : new HttpIssueRepository();
export const analyticsRepository = USE_MOCK ? new MockAnalyticsRepository() : new HttpAnalyticsRepository();

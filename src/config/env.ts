export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  MAP_API_KEY: import.meta.env.VITE_MAP_API_KEY || '',
  USE_MOCK: import.meta.env.VITE_USE_MOCK === 'true',
  NODE_ENV: import.meta.env.MODE || 'development',
} as const;

export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

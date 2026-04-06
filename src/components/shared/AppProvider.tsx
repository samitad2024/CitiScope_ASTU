import React, { ReactNode, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import { TooltipProvider } from '../ui/tooltip';
import { queryClient } from '../../lib/query-client';
import { useAuthStore } from '../../store/auth.store';
import { Toaster } from 'sonner';

interface AppProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: React.ReactNode }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function AppProvider({ children }: AppProviderProps) {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  selectedFilters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  selectedFilters: {},
  setFilter: (key, value) => set((state) => ({
    selectedFilters: { ...state.selectedFilters, [key]: value }
  })),
  clearFilters: () => set({ selectedFilters: {} }),
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));

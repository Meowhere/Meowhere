import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  preventBodyScroll: boolean;
  setPreventBodyScroll: (preventBodyScroll: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  preventBodyScroll: false,
  setPreventBodyScroll: (preventBodyScroll: boolean) => set({ preventBodyScroll }),
}));

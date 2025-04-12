import { create } from 'zustand';

interface UIState {
  isSidebarExpanded: boolean;
  isNotificationsOpen: boolean;
  setIsSidebarExpanded: (value: boolean) => void;
  setIsNotificationsOpen: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarExpanded: false,
  isNotificationsOpen: false,
  setIsSidebarExpanded: (value) => set({ isSidebarExpanded: value }),
  setIsNotificationsOpen: (value) => set({ isNotificationsOpen: value }),
}));
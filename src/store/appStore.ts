/**
 * Store: Estado global com Zustand (exemplo)
 * Gerenciamento de estado da aplicação
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AppState {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;

  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Loading states
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Loading
      loading: false,
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        user: state.user,
        darkMode: state.darkMode,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

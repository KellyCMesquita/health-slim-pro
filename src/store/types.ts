/**
 * Store Types
 * Tipos para gerenciamento de estado global
 */

export interface AppState {
  user: UserState;
  ui: UIState;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  birthDate?: string;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

// Actions
export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

/**
 * Store Context
 * Context para gerenciamento de estado global
 */

"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, User, Notification } from './types';

const initialState: AppState = {
  user: {
    currentUser: null,
    isAuthenticated: false,
    loading: true,
  },
  ui: {
    sidebarOpen: false,
    theme: 'light',
    notifications: [],
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          currentUser: action.payload,
          isAuthenticated: !!action.payload,
          loading: false,
        },
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        user: {
          ...state.user,
          loading: action.payload,
        },
      };
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen,
        },
      };
    
    case 'SET_THEME':
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: action.payload,
        },
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, action.payload],
        },
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== action.payload),
        },
      };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}

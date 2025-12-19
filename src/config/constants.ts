/**
 * Constants
 * Constantes da aplicação
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  MEDICATIONS: '/dashboard/medications',
  WORKOUTS: '/dashboard/workouts',
  APPOINTMENTS: '/dashboard/appointments',
} as const;

export const MEDICATION_TYPES = {
  OZEMPIC: 'ozempic',
  WEGOVY: 'wegovy',
  SAXENDA: 'saxenda',
  MOUNJARO: 'mounjaro',
  OTHER: 'other',
} as const;

export const WORKOUT_DIFFICULTIES = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  EXPIRED: 'expired',
  PAST_DUE: 'past_due',
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd/MM/yyyy HH:mm',
  FULL: "dd 'de' MMMM 'de' yyyy",
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

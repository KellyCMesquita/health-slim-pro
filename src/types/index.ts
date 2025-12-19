/**
 * Common Types
 * Tipos compartilhados em toda a aplicação
 */

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Common entity types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  phone?: string;
  location?: string;
  birthDate?: string;
}

export interface Medication extends BaseEntity {
  userId: string;
  name: string;
  type: 'ozempic' | 'wegovy' | 'saxenda' | 'mounjaro' | 'other';
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  reminders: boolean;
}

export interface Workout extends BaseEntity {
  userId: string;
  title: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  notes?: string;
}

export interface Subscription extends BaseEntity {
  userId: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

// Form types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormError[];
  isSubmitting: boolean;
  isValid: boolean;
}

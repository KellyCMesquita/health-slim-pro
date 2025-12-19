/**
 * Zod Validators
 * Schemas de validação com Zod
 */

import { z } from 'zod';

// Auth validators
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

// User validators
export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  birthDate: z.string().optional(),
});

// Medication validators
export const createMedicationSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  type: z.enum(['ozempic', 'wegovy', 'saxenda', 'mounjaro', 'other']),
  dosage: z.string().min(1, 'Dosagem é obrigatória'),
  frequency: z.string().min(1, 'Frequência é obrigatória'),
  startDate: z.string(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
  reminders: z.boolean().default(true),
});

// Workout validators
export const createWorkoutSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number().min(1),
    reps: z.number().min(1),
    rest: z.number().min(0),
    notes: z.string().optional(),
  })),
  duration: z.number().min(1),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.string(),
});

// Export types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateMedicationInput = z.infer<typeof createMedicationSchema>;
export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;

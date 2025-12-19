/**
 * Feature: Treinos
 * Serviço para gerenciamento de treinos
 */

import { supabase } from '@/lib/supabase/client';

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest?: string;
  weight?: number;
}

export interface Workout {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  exercises: Exercise[];
  duration?: number;
  completed: boolean;
  date: string;
  created_at: string;
}

/**
 * Criar novo treino
 */
export async function createWorkout(
  userId: string,
  workout: Omit<Workout, 'id' | 'user_id' | 'created_at'>
): Promise<Workout | null> {
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      ...workout,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar treino:', error);
    return null;
  }

  return data;
}

/**
 * Listar treinos do usuário
 */
export async function getUserWorkouts(userId: string): Promise<Workout[]> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Erro ao buscar treinos:', error);
    return [];
  }

  return data || [];
}

/**
 * Buscar treino específico
 */
export async function getWorkout(workoutId: string): Promise<Workout | null> {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('id', workoutId)
    .single();

  if (error) {
    console.error('Erro ao buscar treino:', error);
    return null;
  }

  return data;
}

/**
 * Atualizar treino
 */
export async function updateWorkout(
  workoutId: string,
  updates: Partial<Workout>
): Promise<boolean> {
  const { error } = await supabase
    .from('workouts')
    .update(updates)
    .eq('id', workoutId);

  if (error) {
    console.error('Erro ao atualizar treino:', error);
    return false;
  }

  return true;
}

/**
 * Deletar treino
 */
export async function deleteWorkout(workoutId: string): Promise<boolean> {
  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', workoutId);

  if (error) {
    console.error('Erro ao deletar treino:', error);
    return false;
  }

  return true;
}

/**
 * Marcar treino como completo
 */
export async function completeWorkout(workoutId: string): Promise<boolean> {
  return updateWorkout(workoutId, { completed: true });
}

/**
 * Buscar estatísticas de treinos
 */
export async function getWorkoutStats(userId: string) {
  const workouts = await getUserWorkouts(userId);

  const completed = workouts.filter((w) => w.completed).length;
  const totalExercises = workouts.reduce(
    (sum, w) => sum + w.exercises.length,
    0
  );

  return {
    total: workouts.length,
    completed,
    pending: workouts.length - completed,
    totalExercises,
  };
}

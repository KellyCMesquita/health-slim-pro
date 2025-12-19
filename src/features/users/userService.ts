/**
 * Feature: Usuários
 * Serviço para gerenciamento de usuários
 */

import { supabase } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  goal?: 'lose_weight' | 'gain_muscle' | 'maintain';
  created_at: string;
  updated_at: string;
}

/**
 * Buscar perfil do usuário
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }

  return data;
}

/**
 * Atualizar perfil do usuário
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Erro ao atualizar perfil:', error);
    return false;
  }

  return true;
}

/**
 * Deletar conta do usuário
 */
export async function deleteUserAccount(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Erro ao deletar conta:', error);
    return false;
  }

  return true;
}

/**
 * Buscar estatísticas do usuário
 */
export async function getUserStats(userId: string) {
  // Buscar dados de múltiplas tabelas
  const [workouts, meals, weights] = await Promise.all([
    supabase.from('workouts').select('*').eq('user_id', userId),
    supabase.from('meals').select('*').eq('user_id', userId),
    supabase.from('weight_logs').select('*').eq('user_id', userId).order('date', { ascending: false }),
  ]);

  return {
    totalWorkouts: workouts.data?.length || 0,
    totalMeals: meals.data?.length || 0,
    currentWeight: weights.data?.[0]?.weight || 0,
    weightHistory: weights.data || [],
  };
}

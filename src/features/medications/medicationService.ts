/**
 * Feature: Medicações
 * Serviço para gerenciamento de medicações
 */

import { supabase } from '@/lib/supabase/client';

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  notes?: string;
  active: boolean;
  start_date: string;
  end_date?: string;
  created_at: string;
}

/**
 * Criar nova medicação
 */
export async function createMedication(
  userId: string,
  medication: Omit<Medication, 'id' | 'user_id' | 'created_at'>
): Promise<Medication | null> {
  const { data, error } = await supabase
    .from('medications')
    .insert({
      user_id: userId,
      ...medication,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar medicação:', error);
    return null;
  }

  return data;
}

/**
 * Listar medicações do usuário
 */
export async function getUserMedications(
  userId: string,
  activeOnly: boolean = false
): Promise<Medication[]> {
  let query = supabase
    .from('medications')
    .select('*')
    .eq('user_id', userId);

  if (activeOnly) {
    query = query.eq('active', true);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar medicações:', error);
    return [];
  }

  return data || [];
}

/**
 * Atualizar medicação
 */
export async function updateMedication(
  medicationId: string,
  updates: Partial<Medication>
): Promise<boolean> {
  const { error } = await supabase
    .from('medications')
    .update(updates)
    .eq('id', medicationId);

  if (error) {
    console.error('Erro ao atualizar medicação:', error);
    return false;
  }

  return true;
}

/**
 * Deletar medicação
 */
export async function deleteMedication(medicationId: string): Promise<boolean> {
  const { error } = await supabase
    .from('medications')
    .delete()
    .eq('id', medicationId);

  if (error) {
    console.error('Erro ao deletar medicação:', error);
    return false;
  }

  return true;
}

/**
 * Registrar tomada de medicação
 */
export async function logMedicationTaken(
  medicationId: string,
  takenAt: string
): Promise<boolean> {
  const { error } = await supabase
    .from('medication_logs')
    .insert({
      medication_id: medicationId,
      taken_at: takenAt,
    });

  if (error) {
    console.error('Erro ao registrar medicação:', error);
    return false;
  }

  return true;
}

/**
 * Buscar histórico de medicações
 */
export async function getMedicationHistory(
  medicationId: string,
  days: number = 7
) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('medication_logs')
    .select('*')
    .eq('medication_id', medicationId)
    .gte('taken_at', startDate.toISOString())
    .order('taken_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }

  return data || [];
}
